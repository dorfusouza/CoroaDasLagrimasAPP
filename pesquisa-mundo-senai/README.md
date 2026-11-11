# Pesquisa de satisfação – Mundo SENAI (Sesi Agudos, 11 e 12/11)

Quiosque web para alunos do ensino fundamental responderem no computador (mouse/teclado).
Funciona **sem internet**: roda só no próprio computador e não precisa de `npm install`.

## Como usar no dia do evento
1. Instale o Node.js (já instalado no computador do evento).
2. Edite `iniciar-pesquisa.bat` e troque a senha em `ADMIN_SENHA`.
3. Dê dois cliques em **`iniciar-pesquisa.bat`**: sobe o servidor e abre o Chrome em tela cheia. (Sair: `Alt+F4`.)
4. Para ver os resultados, dê dois cliques em **`abrir-painel.bat`** (usuário: qualquer; senha: a do passo 2).
   O painel atualiza sozinho a cada 10 s. Botão **Exportar para Excel (CSV)** baixa todas as respostas.

## Onde ficam os dados
- `data/respostas.jsonl`: todas as respostas (1 por linha).
- `data/backup/respostas-AAAA-MM-DD.jsonl`: cópia separada por dia, gravada ao mesmo tempo.
- Cada resposta é gravada com `fsync`; se o computador desligar, nada se perde.
- **Faça o backup:** ao fim de cada dia, exporte o CSV e copie a pasta `data/` para um pendrive.

## Perguntas
Ficam em `config/perguntas.json` (texto, opções, emojis). Basta editar e reiniciar a página; nada de programar.
Tipos: `escala`, `escolha`, `texto`. O dia do evento é gravado automaticamente pela data.

## Comportamento do quiosque
- Uma pergunta por tela, avanço automático ao clicar (teclas `1`–`9` também funcionam).
- Só grava a pesquisa completa; após 60 s sem mexer, descarta a incompleta e volta ao início.
- Após enviar, mostra "Obrigado!" por 4 s e volta à tela inicial.
- O servidor só aceita conexões deste computador (`127.0.0.1`). Para abrir o painel de outro aparelho da mesma rede: `set HOST=0.0.0.0` no `.bat` (use senha forte).

## Desenvolvimento
`node server.js` (porta 3000, ou `PORT=...`). Sem dependências.
