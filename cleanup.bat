@echo off
echo Deteniendo procesos de Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo Limpiando la caché de npm...
call npm cache clean --force >nul 2>&1
echo Eliminando node_modules...
if exist node_modules rmdir /s /q node_modules >nul 2>&1
echo Limpieza completada.
pause
