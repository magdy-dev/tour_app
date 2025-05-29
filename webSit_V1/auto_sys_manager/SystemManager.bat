@echo off
setlocal enabledelayedexpansion

echo Starting System Manager...
echo Current directory: %CD%
echo.

:: Request admin rights
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    powershell -Command "Start-Process cmd -ArgumentList '/c cd /d \"%~dp0\" && %~nx0' -Verb RunAs"
    exit /B
)

echo Administrative privileges confirmed.
echo Starting maintenance tasks...
echo.

:: Create log file
echo === System Manager Log - %date% %time% === > system_manager.log
echo Starting maintenance tasks... >> system_manager.log

:: Function to log messages
:log
    echo [%date% %time%] %~1
    echo [%date% %time%] %~1 >> system_manager.log
    goto :eof

:: Clear screen and show header
cls
echo ===================================
echo      System Manager v1.0
echo ===================================
echo.
echo Starting system maintenance...
echo.

:: 1. Clean Temporary Files
call :log "Cleaning temporary files..."
for %%p in (
    "%TEMP%"
    "%TMP%"
    "%SystemRoot%\Temp"
    "%SystemRoot%\Prefetch"
) do (
    if exist "%%~p" (
        echo Cleaning: %%~p
        del /s /f /q "%%~p\*.*" 2>nul
        rmdir /s /q "%%~p\*" 2>nul
    )
)

:: 2. Empty Recycle Bin
call :log "Emptying recycle bin..."
rd /s /q C:\$Recycle.bin 2>nul

:: 3. Run Disk Cleanup
call :log "Running disk cleanup..."
cleanmgr /sagerun:1

:: 4. Check Disk
call :log "Checking disk health..."
chkdsk C: /f /r

:: 5. System File Checker
call :log "Running system file checker..."
sfc /scannow

:: 6. DISM Check
call :log "Running DISM health check..."
DISM /Online /Cleanup-Image /RestoreHealth

:: 7. Windows Update
call :log "Checking for Windows updates..."
wuauclt /detectnow /updatenow

:: 8. Clear DNS Cache
call :log "Clearing DNS cache..."
ipconfig /flushdns

:: 9. Clear Windows Update Cache
call :log "Clearing Windows Update cache..."
net stop wuauserv
rd /s /q "%SystemRoot%\SoftwareDistribution"
net start wuauserv

:: 10. Clear Windows Error Reports
call :log "Clearing error reports..."
rd /s /q "%SystemRoot%\System32\winevt\Logs" 2>nul

:: Show completion message
echo.
echo ===================================
echo System maintenance completed!
echo Check system_manager.log for details
echo ===================================
echo.
echo Press any key to exit...
pause > nul

endlocal
exit /B 0 