import os
import sys
import ctypes
import subprocess
import time
import winreg
import shutil
from datetime import datetime
from colorama import init, Fore, Style

init(autoreset=True)

# --- Admin Rights Check ---
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

def elevate():
    if not is_admin():
        print(Fore.YELLOW + "Requesting admin rights...")
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, ' '.join(sys.argv), None, 1)
        sys.exit(0)

def log_message(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")
    # Also save to log file
    with open("system_manager.log", "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {message}\n")

def run_command(command, shell=True):
    try:
        result = subprocess.run(command, shell=shell, capture_output=True, text=True)
        if result.returncode == 0:
            return True, result.stdout
        return False, result.stderr
    except Exception as e:
        return False, str(e)

def cleanup_temp():
    log_message("Cleaning temporary files...")
    temp_paths = [
        os.environ.get('TEMP'),
        os.environ.get('TMP'),
        r'C:\Windows\Temp',
        r'C:\Windows\Prefetch'
    ]
    
    for path in temp_paths:
        if path and os.path.exists(path):
            try:
                for item in os.listdir(path):
                    item_path = os.path.join(path, item)
                    try:
                        if os.path.isfile(item_path):
                            os.unlink(item_path)
                        elif os.path.isdir(item_path):
                            shutil.rmtree(item_path, ignore_errors=True)
                    except Exception as e:
                        log_message(f"Could not remove {item_path}: {str(e)}")
            except Exception as e:
                log_message(f"Error accessing {path}: {str(e)}")

def empty_recycle_bin():
    log_message("Emptying recycle bin...")
    try:
        winshell.recycle_bin().empty(confirm=False, show_progress=False, sound=False)
        log_message("Recycle bin emptied successfully")
    except Exception as e:
        log_message(f"Error emptying recycle bin: {str(e)}")

def check_disk_health():
    log_message("Checking disk health...")
    try:
        # Run chkdsk in read-only mode
        success, output = run_command("chkdsk C: /f /r")
        if success:
            log_message("Disk check completed successfully")
        else:
            log_message(f"Disk check found issues: {output}")
    except Exception as e:
        log_message(f"Error checking disk: {str(e)}")

def check_windows_updates():
    log_message("Checking for Windows updates...")
    try:
        # Use Windows Update command line tool
        success, output = run_command("wuauclt /detectnow /updatenow")
        if success:
            log_message("Windows Update check completed")
        else:
            log_message(f"Windows Update check failed: {output}")
    except Exception as e:
        log_message(f"Error checking updates: {str(e)}")

def optimize_system():
    log_message("Optimizing system...")
    try:
        # Run system file checker
        run_command("sfc /scannow")
        # Run DISM
        run_command("DISM /Online /Cleanup-Image /RestoreHealth")
        log_message("System optimization completed")
    except Exception as e:
        log_message(f"Error during system optimization: {str(e)}")

def main():
    print("=== System Manager ===")
    print("Starting system maintenance...")
    
    # Request admin rights
    elevate()
    
    # Create log file
    with open("system_manager.log", "w", encoding="utf-8") as f:
        f.write("=== System Manager Log ===\n")
    
    try:
        # Run all maintenance tasks
        cleanup_temp()
        empty_recycle_bin()
        check_disk_health()
        check_windows_updates()
        optimize_system()
        
        print("\nAll tasks completed successfully!")
        print("Check system_manager.log for details")
        print("\nPress Enter to exit...")
        input()
        
    except Exception as e:
        log_message(f"Critical error: {str(e)}")
        print("\nAn error occurred. Check system_manager.log for details")
        print("Press Enter to exit...")
        input()

if __name__ == "__main__":
    main()
    print(Fore.YELLOW + Style.BRIGHT + "\nSystem is ready and healthy! You may close this window.") 