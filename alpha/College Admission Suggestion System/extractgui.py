import tkinter as tk
import subprocess
from PIL import Image, ImageTk

# Function to run the "extractionfirst.py" program
def run_program0():
    subprocess.run(["python", "extractionfirst.py"])

# Function to run the "2017ex.py" program
def run_program1():
    subprocess.run(["python", "2017ex.py"])

# Function to run the "2018ex.py" program
def run_program2():
    subprocess.run(["python", "2018ex.py"])

# Function to run the "2019ex.py" program
def run_program3():
    subprocess.run(["python", "2019ex.py"])

# Function to run the "2021ex.py" program
def run_program4():
    subprocess.run(["python", "2021ex.py"])

# Function to run the "2022ex.py" program
def run_program5():
    subprocess.run(["python", "2022ex.py"])

# Function to run the "beauty.py" program
def run_program6():
    subprocess.run(["python", "beauty.py"])

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
button0 = tk.Button(window, text="Initialize Columns", command=run_program0)
button0.pack(pady=10)

button1 = tk.Button(window, text="Extract 2017", command=run_program1)
button1.pack(pady=10)

button2 = tk.Button(window, text="Extract 2018", command=run_program2)
button2.pack(pady=10)

button3 = tk.Button(window, text="Extract 2019", command=run_program3)
button3.pack(pady=10)

button4 = tk.Button(window, text="Extract 2021", command=run_program4)
button4.pack(pady=10)

button5 = tk.Button(window, text="Extract 2022", command=run_program5)
button5.pack(pady=10)

button6 = tk.Button(window, text="Beautify", command=run_program6)
button6.pack(pady=10)

# Create an exit button to close the application
button7 = tk.Button(window, text="EXIT", command=exit_program)
button7.pack(pady=10)

# Start the tkinter main loop
window.mainloop()
