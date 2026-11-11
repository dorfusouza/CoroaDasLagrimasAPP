---
projeto: Pesquisa de Satisfação – Mundo SENAI
data: 2026-11-11
status: implementado
tags: [projeto/mundo-senai, pesquisa, evento]
---
# Pesquisa de Satisfação – Mundo SENAI

## Contexto
- **Evento:** Mundo SENAI, Sesi Agudos, 11 e 12/11/2026
- **Público:** alunos do ensino fundamental (~500 respostas esperadas)
- **Formato:** um computador no local (mouse e teclado, sem touch), página web em modo quiosque

## Decisões
- **Arquitetura A:** página local + servidor Node sem dependências, **funciona offline** (Wi-Fi de evento é instável).
- **Gravação:** `data/respostas.jsonl` + backup diário em `data/backup/`, com `fsync` a cada resposta.
- **Painel** `/admin` com senha (resultados ao vivo) e **exportação CSV** (`;` + BOM, abre no Excel em português).
- **Questões reduzidas** de 11 para 6 (público infantil, resposta rápida). Dia do evento vem da data automática.

## Questões finais
1. Em qual ano você está? (6º a 9º / Outro)
2. O que você achou do Mundo SENAI? (😍 🙂 😐 🙁)
3. O que você mais gostou? (oficinas, tecnologia/robótica, cursos, monitores, brincadeiras/brindes, outra)
4. As explicações foram fáceis de entender? (Sim / Mais ou menos / Não)
5. Ficou com vontade de conhecer os cursos do SENAI? (Sim / Talvez / Não)
6. Recado ou ideia para o próximo (opcional, até 300 caracteres)

## Operação
- `iniciar-pesquisa.bat` → servidor + Chrome em tela cheia (sair: Alt+F4)
- `abrir-painel.bat` → painel de resultados
- Trocar a senha padrão (`senai2026`) no `.bat`
- Backup: exportar CSV e copiar `data/` para pendrive ao fim de cada dia

## Pendências
- [ ] Ajustar opções da pergunta 3 aos stands reais do evento (`config/perguntas.json`)
- [ ] Testar no computador do evento (Chrome instalado? senão trocar por `msedge` no `.bat`)
- [ ] Trocar a senha do painel

## Código
Repositório `dorfusouza/CoroaDasLagrimasAPP`, pasta `pesquisa-mundo-senai/`, branch `ccr-fcb23450-br52g3`.
