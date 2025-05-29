# Auto System Manager

A ready-to-run automation app for Windows that:
- Checks, fixes, and updates system tasks
- Handles permissions automatically (requests admin rights)
- Cleans disk, checks for updates, kills unresponsive processes, and summarizes system health
- Requires minimal user input

## Features
- **Windows Update**: Checks and installs updates
- **Disk Cleanup**: Cleans temp files and recycle bin
- **Process Health**: Kills unresponsive processes
- **System Health Summary**: Reports status and fixes issues

## How to Run

1. **Install Python 3.10+** (if not already installed)
2. Open a terminal in this folder
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run the app:
   ```sh
   python main.py
   ```

## Build as Standalone EXE (Optional)
1. Install PyInstaller:
   ```sh
   pip install pyinstaller
   ```
2. Build:
   ```sh
   pyinstaller --onefile main.py
   ```
3. The EXE will be in the `dist/` folder.

---
**Note:** The app will request admin rights as needed for system operations. 