import tkinter as tk
import subprocess
from PIL import Image, ImageTk

# Function to run 'linearregression.py'
def run_program0():
    subprocess.run(["python", "E:\project\ml final models\linearregression.py"])

# Function to run 'mlpregressor.py'
def run_program1():
    subprocess.run(["python", "E:\project\ml final models\mlpregressor.py"])

# Function to run 'polynomialregression.py'
def run_program2():
    subprocess.run(["python", "E:\project\ml final models\polynomialregression.py"])

# Function to run 'erandomforest.py'
def run_program3():
    subprocess.run(["python", "E:\project\ml final models\erandomforest.py"])

# Function to run 'SupportVectorRegression.py'
def run_program4():
    subprocess.run(["python", "E:\project\ml final models\SupportVectorRegression.py"])

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

# Create buttons to run various machine learning regression scripts
button1 = tk.Button(window, text="Linear Regression", command=run_program0)
button1.pack(pady=10)

# button1 = tk.Button(window, text="MLP Regression", command=run_program1)
# button1.pack(pady=10)

button2 = tk.Button(window, text="Polynomial Regression", command=run_program2)
button2.pack(pady=10)

button3 = tk.Button(window, text="Random Forest", command=run_program3)
button3.pack(pady=10)

button4 = tk.Button(window, text="Support Vector Regression", command=run_program4)
button4.pack(pady=10)

# Create an exit button to close the application
exit_button = tk.Button(window, text="EXIT", command=exit_program)
exit_button.pack(pady=10)

# Start the tkinter main loop
window.mainloop()
