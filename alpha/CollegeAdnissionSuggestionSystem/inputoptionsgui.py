import tkinter as tk
import subprocess
from PIL import Image, ImageTk

# Function to run the "insertgui.py" program
def run_program0():
    subprocess.run(["python", "insertgui.py"])

# Function to run the "extractgui.py" program
def run_program1():
    subprocess.run(["python", "extractgui.py"])

# Function to exit the program
def exit_program():
    window.destroy()

# Create the main application window
window = tk.Tk()
window.title("Program Connector")

# Get the screen dimensions
screen_width = window.winfo_screenwidth()
screen_height = window.winfo_screenheight()

# Calculate the center of the screen
center_x = screen_width // 2
center_y = screen_height // 2

# Set window dimensions and position it in the center of the screen
window_width = 400
window_height = 450
window.geometry(f"{window_width}x{window_height}+{center_x - (window_width // 2)}+{center_y - (window_height // 2)}")

# Create a label for the title
label = tk.Label(window, text="ADMIN", font=("Arial", 24, "bold"))
label.pack(pady=20)

# Create buttons to run different programs
button1 = tk.Button(window, text="Insert Manually", command=run_program0)
button1.pack(pady=10)

button2 = tk.Button(window, text="Extract From Excel Sheet", command=run_program1)
button2.pack(pady=10)

# Create an exit button to close the application
button3 = tk.Button(window, text="EXIT", command=exit_program)
button3.pack(pady=10)

# Start the tkinter main loop
window.mainloop()
