@echo off
cd /d "%~dp0"
rem Troque a senha do painel abaixo:
set ADMIN_SENHA=senai2026
start "Servidor Pesquisa" /min cmd /c "node server.js"
timeout /t 2 /nobreak >nul
rem Tela cheia (sair: Alt+F4). Se nao tiver Chrome, troque "chrome" por "msedge".
start "" chrome --kiosk --incognito http://localhost:3000
