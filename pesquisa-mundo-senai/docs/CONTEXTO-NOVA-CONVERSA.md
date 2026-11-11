# Contexto: pesquisa de satisfação Mundo SENAI (para continuar em outra conversa)

## Pedido original
Pesquisa de satisfação do evento **Mundo SENAI** (Sesi Agudos, 11 e 12/11/2026) para **alunos do ensino fundamental**.
Será respondida em **um computador no local** (página web em modo quiosque) e as respostas precisam ser **gravadas**.

## Decisões já tomadas
- **Arquitetura:** página local + servidor Node **sem dependências** (sem `npm install`), **funciona offline** (Wi-Fi de evento é instável).
- **Ambiente do evento:** Windows com Node, **tela sem touch** (mouse e teclado), ~**500 alunos**.
- **Painel** de resultados ao vivo + **exportação para Excel (CSV)**.
- **Questões reduzidas de 11 para 6** (público infantil, resposta rápida). O dia do evento é gravado pela data automática.
- **Preferência do usuário:** documentar tudo em `C:\Codigos\Vault\obsidian-vault\B01 - Inbox`, organizado por projeto.

## Questões finais (config/perguntas.json)
1. Em qual ano você está? (6º, 7º, 8º, 9º, Outro)
2. O que você achou do Mundo SENAI? (😍 Amei · 🙂 Gostei · 😐 Mais ou menos · 🙁 Não gostei)
3. O que você mais gostou? (oficinas/atividades práticas, tecnologia e robótica, conhecer os cursos, monitores e professores, brincadeiras e brindes, outra coisa) → **ajustar aos stands reais**
4. As explicações foram fáceis de entender? (Sim / Mais ou menos / Não)
5. Ficou com vontade de conhecer os cursos do SENAI? (Sim / Talvez / Não)
6. Recado ou ideia para o próximo evento (texto opcional, até 300 caracteres)

Esquema de cada pergunta: `{id, titulo, texto, tipo: "escala"|"escolha"|"texto", obrigatoria, opcoes:[{id, rotulo, emoji}], maxCaracteres}`.

## O que foi construído (já testado no Linux com Node 22 + Chromium)
Pasta `pesquisa-mundo-senai/`:
- `server.js`: servidor HTTP puro (porta 3000, `127.0.0.1`). Rotas: `GET /api/perguntas`, `POST /api/respostas` (valida contra a config), `GET /api/admin/resumo`, `GET /api/admin/exportar.csv`. `/admin` e `/api/admin/*` com Basic Auth (`ADMIN_SENHA`, padrão `senai2026`, comparação em tempo constante). Sem path traversal.
- Gravação: `data/respostas.jsonl` + backup diário `data/backup/respostas-AAAA-MM-DD.jsonl`, com `fsync` a cada resposta.
- CSV: separador `;`, BOM UTF-8 (abre no Excel pt-BR), células com `=+-@` ganham `'` na frente (anti fórmula).
- `public/index.html`, `app.js`, `style.css`: quiosque, uma pergunta por tela, avança ao clicar, teclas 1–9, botão Voltar, só grava pesquisa completa, "Obrigado!" por 4 s, descarta pesquisa parada por 60 s.
- `public/admin.html`: total por dia, barras por pergunta, últimos 100 recados, atualiza a cada 10 s, botão Exportar.
- `iniciar-pesquisa.bat` (sobe servidor + Chrome `--kiosk`; trocar por `msedge` se não houver Chrome), `abrir-painel.bat`, `README.md`, `docs/Obsidian-Pesquisa-Mundo-SENAI.md`.

## Onde está o código
GitHub `dorfusouza/CoroaDasLagrimasAPP`, branch `ccr-fcb23450-br52g3`, pasta `pesquisa-mundo-senai/`.
Sessão de origem: https://claude.ai/code/session_01SR6kDxkt7p9Ndq2fUq6AB5

## Pendências
- [ ] Criar o app no **novo local** (a definir com o usuário: pasta/repositório) copiando a pasta `pesquisa-mundo-senai/`
- [ ] Ajustar opções da pergunta 3 aos stands reais
- [ ] Trocar a senha do painel no `.bat`
- [ ] Testar no Windows do evento (Chrome em tela cheia, Alt+F4 sai)
- [ ] Copiar a nota `docs/Obsidian-Pesquisa-Mundo-SENAI.md` para o vault (`B01 - Inbox`)
- [ ] Combinar rotina de backup (exportar CSV + copiar `data/` para pendrive ao fim de cada dia)
