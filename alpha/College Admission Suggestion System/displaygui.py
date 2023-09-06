import tkinter as tk
from tkinter import ttk
import sqlite3

# Function to load data from the 'college' table in the SQLite database
def load_table():
    conn = sqlite3.connect("db1.db")
    cursor = conn.cursor()

    # Execute an SQL query to select all rows from the 'college' table
    cursor.execute("SELECT * FROM college")
    rows = cursor.fetchall()
    
    # Get the column names from the description of the cursor
    columns = [description[0] for description in cursor.description]

    # Close the database connection
    conn.close()

    return columns, rows

# Function to create a table viewer window
def create_table_window():
    columns, table_rows = load_table()

    # Create the main window for the table viewer
    window = tk.Tk()
    window.title("Table Viewer")
    window.geometry('800x500')

    # Create a Treeview widget to display the table data
    tree = ttk.Treeview(window)
    tree["columns"] = tuple(range(len(columns)))
    tree["show"] = "headings"

    # Add column headers to the Treeview
    for i, column in enumerate(columns):
        tree.heading(i, text=column)

    # Insert rows of data into the Treeview
    for row in table_rows:
        tree.insert("", tk.END, values=row)

    # Create a vertical scrollbar for the Treeview
    scrollbar = ttk.Scrollbar(window, orient="vertical")
    tree.configure(yscrollcommand=scrollbar.set)

    # Pack the Treeview and scrollbar to the window
    tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
    scrollbar.config(command=tree.yview)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    # Start the tkinter main loop
    window.mainloop()

# Call the create_table_window() function to display the table viewer
create_table_window()
