@echo off
echo Building System Manager...
echo Installing required packages...
pip install -r requirements.txt
echo Creating standalone executable...
pyinstaller --onefile --uac-admin --icon=NONE --name "SystemManager" main.py
echo.
echo Build complete! The executable is in the 'dist' folder.
echo.
pause 