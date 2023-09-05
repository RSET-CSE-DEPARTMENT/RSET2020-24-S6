import tkinter as tk
import subprocess

# Function to run 'database.py'
def run_program0():
    subprocess.run(["python", "database.py"])

# Function to run 'inputoptionsgui.py'
def run_program1():
    subprocess.run(["python", "inputoptionsgui.py"])

# Function to run 'predictgui.py'
def run_program2():
    subprocess.run(["python", "predictgui.py"])

# Function to run 'displaygui.py'
def run_program3():
    subprocess.run(["python", "displaygui.py"])

# Function to run 'updategui.py'
def run_program4():
    subprocess.run(["python", "updategui.py"])

# Function to exit the program
def exit_program():
    window.destroy()

# Create a tkinter window
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

# Create buttons to run various Python scripts
button1 = tk.Button(window, text="CREATE TABLE", command=run_program0)
button1.pack(pady=10)

button2 = tk.Button(window, text="INSERT DETAILS", command=run_program1)
button2.pack(pady=10)

button3 = tk.Button(window, text="EDIT DETAILS", command=run_program4)
button3.pack(pady=10)

button4 = tk.Button(window, text="PREDICT", command=run_program2)
button4.pack(pady=10)

button5 = tk.Button(window, text="DISPLAY DATABASE", command=run_program3)
button5.pack(pady=10)

# Create an exit button to close the application
exit_button = tk.Button(window, text="EXIT", command=exit_program)
exit_button.pack(pady=10)

# Start the tkinter main loop
window.mainloop()
