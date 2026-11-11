// Quiosque: uma pergunta por tela, clique do mouse (ou teclas 1-9), volta sozinho ao início.
const app = document.getElementById('app');
const OCIOSO_MS = 60000; // sem mexer por 60s numa pesquisa em andamento: descarta e volta ao início
const OBRIGADO_MS = 4000;

let perguntas = [];
let passo = 0;
let respostas = {};
let timerOcioso = null;
let enviando = false;

const el = (html) => { app.innerHTML = html; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function armarOcioso() {
  clearTimeout(timerOcioso);
  timerOcioso = setTimeout(inicio, OCIOSO_MS);
}
['click', 'keydown', 'mousemove'].forEach((e) => document.addEventListener(e, () => passo > 0 && armarOcioso()));

async function carregar() {
  try {
    const r = await fetch('/api/perguntas', { cache: 'no-store' });
    perguntas = (await r.json()).perguntas;
    inicio();
  } catch {
    el('<p class="erro">Não consegui carregar a pesquisa.</p><button class="botao" onclick="location.reload()">Tentar de novo</button>');
  }
}

function inicio() {
  clearTimeout(timerOcioso);
  passo = 0;
  respostas = {};
  enviando = false;
  el(`
    <h1>Conta pra gente! 🎉</h1>
    <p class="sub">Responda ${perguntas.length} perguntinhas rápidas sobre o Mundo SENAI.</p>
    <button class="botao" id="comecar">Começar</button>`);
  document.getElementById('comecar').onclick = () => { passo = 1; mostrar(); armarOcioso(); };
}

function mostrar() {
  const p = perguntas[passo - 1];
  const total = perguntas.length;
  const pct = Math.round(((passo - 1) / total) * 100);
  const cab = `
    <div class="progresso"><i style="width:${pct}%"></i></div>
    <p class="sub">Pergunta ${passo} de ${total}</p>
    <h2>${esc(p.texto)}</h2>`;
  const voltar = passo > 1 ? '<button class="voltar" id="voltar">← Voltar</button>' : '';

  if (p.tipo === 'texto') {
    el(`${cab}
      <textarea id="texto" maxlength="${p.maxCaracteres || 300}" placeholder="Escreva aqui..."></textarea>
      <div class="contador"><span id="cont">0</span>/${p.maxCaracteres || 300}</div>
      <p class="erro" id="erro"></p>
      <div style="display:flex;gap:2vw;flex-wrap:wrap;justify-content:center">
        <button class="botao sec" id="pular">Pular</button>
        <button class="botao" id="enviar">Enviar ✔</button>
      </div>${voltar}`);
    const ta = document.getElementById('texto');
    ta.focus();
    ta.oninput = () => (document.getElementById('cont').textContent = ta.value.length);
    document.getElementById('enviar').onclick = () => finalizar(ta.value);
    document.getElementById('pular').onclick = () => finalizar('');
  } else {
    el(`${cab}
      <div class="grade">${p.opcoes.map((o, i) => `
        <button class="opcao" data-id="${esc(o.id)}">
          ${o.emoji ? `<span class="emoji">${o.emoji}</span>` : ''}
          <span>${esc(o.rotulo)}</span>
          <small>tecla ${i + 1}</small>
        </button>`).join('')}</div>${voltar}`);
    app.querySelectorAll('.opcao').forEach((b) => (b.onclick = () => escolher(p, b.dataset.id)));
  }
  const v = document.getElementById('voltar');
  if (v) v.onclick = () => { passo--; mostrar(); };
}

function escolher(p, id) {
  respostas[p.id] = id;
  passo++;
  mostrar();
}

document.addEventListener('keydown', (e) => {
  if (passo < 1 || !perguntas[passo - 1] || perguntas[passo - 1].tipo === 'texto') return;
  const p = perguntas[passo - 1];
  const n = Number(e.key);
  if (n >= 1 && n <= p.opcoes.length) escolher(p, p.opcoes[n - 1].id);
});

async function finalizar(textoLivre) {
  if (enviando) return;
  enviando = true;
  const ult = perguntas[perguntas.length - 1];
  const corpo = { ...respostas, [ult.id]: textoLivre.trim() };
  try {
    const r = await fetch('/api/respostas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    });
    if (!r.ok) throw new Error();
  } catch {
    enviando = false;
    const e = document.getElementById('erro');
    if (e) e.textContent = 'Ops, não deu para salvar. Clique em Enviar de novo.';
    return;
  }
  clearTimeout(timerOcioso);
  passo = 0;
  el(`<div class="grande-emoji">🎉</div><h1>Obrigado!</h1><p class="sub">Sua opinião ajuda a deixar o próximo Mundo SENAI ainda melhor.</p>`);
  setTimeout(inicio, OBRIGADO_MS);
}

carregar();
