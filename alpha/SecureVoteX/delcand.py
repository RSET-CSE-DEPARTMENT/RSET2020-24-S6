# Importing necessary header files
from tkinter import *
from tkinter import messagebox
import tkinter as tk
from cryptography import *  
import sqlite3

# Establish a connection to the SQLite database
con = sqlite3.connect(database="SecureVoteX.db")
cur = con.cursor()

# Define the name of the candidate table in the database
candTable = "candidates"

# Initialize a variable to store an existing root window 
existing_root = None

# Function to delete a candidate
def deletecand():
    uid = candInfo1.get()
    
    # SQL query to delete a candidate by their ID
    deleteSql = "DELETE FROM " + candTable + " WHERE uid = '" + uid + "'"
    
    try:
        # Execute the SQL query
        cur.execute(deleteSql)
        con.commit()
        
        # Check if any rows were affected (candidate deleted)
        if cur.rowcount > 0:
            messagebox.showinfo('Success', 'Candidate Deleted Successfully', parent=root)
        else:
            messagebox.showerror('Error', 'Candidate ID not found', parent=root)
    except:
        # Handle exceptions 
        messagebox.showinfo("Please check Candidate ID ", parent=root)
    
    # Clear the Entry field
    candInfo1.delete(0, END)
    root.destroy()

# Function to create a window for deleting a candidate
def delc(): 
    global existing_root  # Declare the variable as global to modify it inside the function

    if existing_root and existing_root.winfo_exists():  # Check if the existing root exists and is not closed
        existing_root.destroy()

    global candInfo1, Canvas1, con, cur, candTable, root
    
    # Creating GUI window
    root = tk.Toplevel()
    root.title("Delete Candidate")
    root.minsize(width=400, height=400)
    root.geometry("600x500")

    Canvas1 = Canvas(root)
    Canvas1.config(bg="#242424")
    Canvas1.pack(expand=True, fill=BOTH)
        
    headingFrame1 = Frame(root, bg="#2b2b2b")
    headingFrame1.place(relx=0., rely=0, relwidth=1, relheight=0.23)
        
    headingLabel = Label(headingFrame1, text="Delete Candidate", bg="#2b2b2b", fg='white', font=('Courier', 15))
    headingLabel.place(relx=0, rely=0, relwidth=1, relheight=1)
    
    labelFrame = Frame(root, bg="#2b2b2b")
    labelFrame.place(relx=0.1, rely=0.3, relwidth=0.8, relheight=0.5)   
        
    # Label and Entry field for Candidate ID
    lb2 = Label(labelFrame, text="Candidate ID: ", bg="#2b2b2b", fg='white')
    lb2.place(relx=0.05, rely=0.5)
        
    candInfo1 = Entry(labelFrame, bg="#353638", fg="white")
    candInfo1.place(relx=0.3, rely=0.5, relwidth=0.62)
    
    # Submit Button
    SubmitBtn = Button(root, text="SUBMIT", bg='#1f69a6', fg='white', command=deletecand)
    SubmitBtn.place(relx=0.28, rely=0.9, relwidth=0.18, relheight=0.08)
    
    # Quit Button
    quitBtn = Button(root, text="Quit", bg='#1f69a6', fg='white', command=root.destroy)
    quitBtn.place(relx=0.53, rely=0.9, relwidth=0.18, relheight=0.08)
    
    # Set a protocol handler to handle window close event
    root.protocol("WM_DELETE_ROOT", on_close)

    existing_root = root  # Update the reference to the existing root

    root.mainloop()

def on_close():  # To destroy the duplicate window created
    global existing_window  
    
    if existing_window:
        existing_window.destroy() 
    existing_window = None  

