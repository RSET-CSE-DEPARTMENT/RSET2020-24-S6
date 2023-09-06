import tkinter as tk
import sqlite3

# Define column names for the input fields
col = ['Sno', 'ccode', 'College name', 'Location', 'Course name', 'Aided or Private or GOVT', 'Hostel available', 'NIRF', 'Year 1 cutoff', 'Year 2 cutoff', 'Year 3 cutoff', 'Year 4 cutoff', 'Year 5 cutoff']

# Function to exit the program
def exit_program():
    window.destroy()

# Function to submit user inputs to the database
def submit_inputs():
    inputs = []
    for i in range(13):
        value = entry_fields[i].get()
        inputs.append(value)

    # Connect to the SQLite database
    conn = sqlite3.connect("db1.db")
    cursor = conn.cursor()

    # Execute an SQL INSERT statement to add user inputs to the database
    cursor.execute("INSERT INTO college (sno, ccode, cname, loc, coname, apg, hos, nirf, y1, co1, y2, co2, y3, co3, y4, co4, y5, co5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 2017, ?, 2018, ?, 2019, ?, 2021, ?, 2022, ?)", inputs)

    # Commit the changes and close the database connection
    conn.commit()
    conn.close()

    print("User inputs submitted to the database.")

# Create the main application window
window = tk.Tk()
window.title("Input Program")
window.geometry('800x500')
entry_fields = []

# Create labels and entry fields for each column
for i in range(13):
    label = tk.Label(window, text=col[i] + ":")
    label.grid(row=i, column=50, padx=100, pady=5)

    entry = tk.Entry(window)
    entry.grid(row=i, column=51, padx=50, pady=5)

    entry_fields.append(entry)

# Create a button to submit user inputs
button = tk.Button(window, text="Submit Inputs", command=submit_inputs)
button.grid(row=14, column=50, columnspan=2, padx=5, pady=10)

# Create an exit button to close the application
exit_button = tk.Button(window, text="Exit", command=exit_program)
exit_button.grid(row=14, column=51, columnspan=2, padx=5, pady=10)

# Start the tkinter main loop
window.mainloop()
