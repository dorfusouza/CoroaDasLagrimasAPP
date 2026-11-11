// Servidor da pesquisa Mundo SENAI. Sem dependências: só precisa do Node.
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1'; // só este computador acessa
const SENHA = process.env.ADMIN_SENHA || 'senai2026';

const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const DATA = path.join(ROOT, 'data');
const BACKUP = path.join(DATA, 'backup');
const ARQUIVO = path.join(DATA, 'respostas.jsonl');
fs.mkdirSync(BACKUP, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const config = () =>
  JSON.parse(fs.readFileSync(path.join(ROOT, 'config', 'perguntas.json'), 'utf8'));

function lerRespostas() {
  if (!fs.existsSync(ARQUIVO)) return [];
  return fs
    .readFileSync(ARQUIVO, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

const pad = (n) => String(n).padStart(2, '0');
const diaLocal = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const horaLocal = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

function validar(corpo, perguntas) {
  const saida = {};
  for (const p of perguntas) {
    const v = corpo[p.id];
    if (p.tipo === 'texto') {
      const t = typeof v === 'string' ? v.trim().slice(0, p.maxCaracteres || 300) : '';
      if (p.obrigatoria && !t) return { erro: `Falta responder: ${p.titulo}` };
      saida[p.id] = t;
    } else {
      if (v === undefined || v === null || v === '') {
        if (p.obrigatoria) return { erro: `Falta responder: ${p.titulo}` };
        saida[p.id] = '';
        continue;
      }
      if (!p.opcoes.some((o) => o.id === v)) return { erro: `Resposta inválida: ${p.titulo}` };
      saida[p.id] = v;
    }
  }
  return { valor: saida };
}

function gravar(registro) {
  const linha = JSON.stringify(registro) + '\n';
  // append + fsync para não perder resposta se o computador desligar
  for (const arq of [ARQUIVO, path.join(BACKUP, `respostas-${registro.dia}.jsonl`)]) {
    const fd = fs.openSync(arq, 'a');
    fs.writeSync(fd, linha);
    fs.fsyncSync(fd);
    fs.closeSync(fd);
  }
}

function autorizado(req) {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Basic ')) return false;
  const [, senha = ''] = Buffer.from(h.slice(6), 'base64').toString().split(/:(.*)/s);
  const a = crypto.createHash('sha256').update(senha).digest();
  const b = crypto.createHash('sha256').update(SENHA).digest();
  return crypto.timingSafeEqual(a, b);
}

function json(res, status, obj) {
  res.writeHead(status, { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}

function resumo() {
  const { perguntas } = config();
  const rs = lerRespostas();
  const porDia = {};
  for (const r of rs) porDia[r.dia] = (porDia[r.dia] || 0) + 1;
  const questoes = perguntas
    .filter((p) => p.tipo !== 'texto')
    .map((p) => {
      const contagem = Object.fromEntries(p.opcoes.map((o) => [o.id, 0]));
      for (const r of rs) if (contagem[r.respostas[p.id]] !== undefined) contagem[r.respostas[p.id]]++;
      return {
        id: p.id,
        titulo: p.titulo,
        texto: p.texto,
        opcoes: p.opcoes.map((o) => ({
          id: o.id,
          rotulo: o.rotulo,
          emoji: o.emoji || '',
          total: contagem[o.id],
        })),
      };
    });
  const campoTexto = perguntas.find((p) => p.tipo === 'texto');
  const recados = campoTexto
    ? rs
        .filter((r) => r.respostas[campoTexto.id])
        .slice(-100)
        .reverse()
        .map((r) => ({ dia: r.dia, hora: r.hora, texto: r.respostas[campoTexto.id] }))
    : [];
  return { total: rs.length, porDia, questoes, recados };
}

const celula = (v) => {
  let s = String(v ?? '').replace(/\r?\n/g, ' ');
  if (/^[=+\-@\t]/.test(s)) s = "'" + s; // evita fórmulas no Excel
  return `"${s.replace(/"/g, '""')}"`;
};

function csv() {
  const { perguntas } = config();
  const rotulo = (p, id) => p.opcoes?.find((o) => o.id === id)?.rotulo ?? id;
  const cab = ['ID', 'Dia', 'Hora', ...perguntas.map((p) => p.titulo)];
  const linhas = lerRespostas().map((r) => [
    r.id,
    r.dia,
    r.hora,
    ...perguntas.map((p) => (p.tipo === 'texto' ? r.respostas[p.id] : rotulo(p, r.respostas[p.id]))),
  ]);
  // BOM + ';' para o Excel em português abrir direto com acentos e colunas
  return '﻿' + [cab, ...linhas].map((l) => l.map(celula).join(';')).join('\r\n') + '\r\n';
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let dados = '';
    req.on('data', (c) => {
      dados += c;
      if (dados.length > 20000) {
        reject(new Error('grande'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(dados));
    req.on('error', reject);
  });
}

function estatico(req, res, url) {
  let rel = decodeURIComponent(url.pathname);
  if (rel === '/') rel = '/index.html';
  if (rel === '/admin') rel = '/admin.html';
  const arq = path.normalize(path.join(PUBLIC, rel));
  if (!arq.startsWith(PUBLIC + path.sep) || !fs.existsSync(arq) || !fs.statSync(arq).isFile()) {
    res.writeHead(404);
    return res.end('Não encontrado');
  }
  res.writeHead(200, {
    'Content-Type': MIME[path.extname(arq)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(arq).pipe(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const rota = url.pathname;

    const protegida = rota === '/admin' || rota === '/admin.html' || rota.startsWith('/api/admin/');
    if (protegida && !autorizado(req)) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Painel Mundo SENAI"' });
      return res.end('Senha necessária');
    }

    if (req.method === 'GET' && rota === '/api/perguntas') return json(res, 200, config());

    if (req.method === 'POST' && rota === '/api/respostas') {
      let corpo;
      try {
        corpo = JSON.parse(await lerCorpo(req));
      } catch {
        return json(res, 400, { erro: 'Dados inválidos' });
      }
      const v = validar(corpo || {}, config().perguntas);
      if (v.erro) return json(res, 400, { erro: v.erro });
      const agora = new Date();
      const registro = {
        id: crypto.randomUUID(),
        criadoEm: agora.toISOString(),
        dia: diaLocal(agora),
        hora: horaLocal(agora),
        respostas: v.valor,
      };
      gravar(registro);
      return json(res, 201, { ok: true });
    }

    if (req.method === 'GET' && rota === '/api/admin/resumo') return json(res, 200, resumo());

    if (req.method === 'GET' && rota === '/api/admin/exportar.csv') {
      res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="pesquisa-mundo-senai-${diaLocal(new Date())}.csv"`,
      });
      return res.end(csv());
    }

    if (req.method === 'GET') return estatico(req, res, url);
    res.writeHead(405);
    res.end();
  } catch (e) {
    console.error(e);
    json(res, 500, { erro: 'Erro interno' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Pesquisa:  http://localhost:${PORT}`);
  console.log(`Painel:    http://localhost:${PORT}/admin  (usuário: qualquer, senha: ${SENHA === 'senai2026' ? 'senai2026 (padrão)' : '(definida em ADMIN_SENHA)'})`);
  console.log(`Respostas: ${ARQUIVO}`);
});
