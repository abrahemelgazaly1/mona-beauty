@echo off
echo Starting MONA BEAUTY...
echo.
echo Starting API Server on port 3001...
start "API Server" cmd /k "node server.js"
timeout /t 2 /nobreak >nul
echo Starting Frontend on port 3000...
start "Frontend" cmd /k "npm run dev:vite"
echo.
echo ================================
echo MONA BEAUTY is starting...
echo.
echo API Server: http://localhost:3001
echo Frontend: http://localhost:3000
echo Admin Login: http://localhost:3000/admin/login
echo.
echo Close this window to stop checking status
echo ================================
echo.
:check
timeout /t 5 /nobreak >nul
echo Servers are running... (Close the other windows to stop the servers)
goto check
