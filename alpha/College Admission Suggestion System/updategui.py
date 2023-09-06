# Import necessary libraries
import tkinter as tk
import sqlite3

# Define column names for the input fields
col = ['Sno', 'College name', 'Location', 'Course name', 'Aided or Private or GOVT', 'Hostel available', 'NIRF',
       'Year 1 cutoff', 'Year 2 cutoff', 'Year 3 cutoff', 'Year 4 cutoff', 'Year 5 cutoff', 'Sno to be changed']

# Define a function to exit the program
def exit_program():
    window.destroy()

# Define a function to submit user inputs to the database
def submit_inputs():
    # Create an empty list to store user inputs
    inputs = []
    for i in range(13):
        value = entry_fields[i].get()
        inputs.append(value)

    # Connect to the SQLite database
    conn = sqlite3.connect("db1.db")
    cursor = conn.cursor()

    # Update the database record with user inputs
    cursor.execute("UPDATE college SET sno=?, cname=?, loc=?, coname=?, apg=?, hos=?, nirf=?, y1=2017, co1=?, y2=2018, co2=?, y3=2019, co3=?, y4=2021, co4=?, y5=2022, co5=? WHERE sno = ?", inputs)

    # Commit the changes and close the database connection
    conn.commit()
    conn.close()

    # Print a message to indicate that user inputs have been submitted
    print("User inputs submitted to the database.")

# Create the main application window
window = tk.Tk()
window.title("Input Program")
window.geometry('800x500')

# Create a list to store input fields
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
