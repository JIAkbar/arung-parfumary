@echo off
cd /d "%~dp0"
echo Menjalankan dev server Arung Wangi di http://localhost:3001 ...
echo (Port 3001 dipakai supaya tidak bentrok dengan GitLab lokal di port 3000)
start "" cmd /c "timeout /t 4 /nobreak >nul && start "" http://localhost:3001"
call npm run dev -- -p 3001
pause
