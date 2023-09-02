# Importing necessary header files
from tkinter import *
from tkinter import messagebox
from cryptography import *
import sqlite3
from fcon import *  

# Establish a connection to the SQLite database
con = sqlite3.connect(database="SecureVoteX.db")
cur = con.cursor()

# Define the name of the voter table in the database
voterTable = "voter"

# Initialize a variable to store an existing root window (if any)
existing_root = None

# Function to delete a voter and their fingerprint template
def deletevoter():
    # Get the voter ID from the Entry widget
    vid = voterinfo1.get()

    # SQL query to get the fingerprint ID associated with the voter
    gfid = "SELECT fid FROM voter"
    cur.execute(gfid)
    con.commit()
    for i in cur:
        fid = i[0]

    # SQL query to delete the voter by their ID
    deleteSql = "DELETE FROM " + voterTable + " WHERE uid = '" + vid + "'"

    try:
        # Execute the SQL query to delete the voter
        cur.execute(deleteSql)
        con.commit()

        # Check if any rows were affected (voter deleted)
        if cur.rowcount > 0:
            messagebox.showinfo('Success', 'Voter Deleted Successfully', parent=root)
        else:
            messagebox.showerror('Error', 'Voter ID not found', parent=root)
    except Exception as e:
        # Handle exceptions 
        messagebox.showinfo("Please check Voter ID ", str(e), parent=root)

    # Check if the fingerprint template deletion is successful
    if f.deleteTemplate(int(fid)):
        print('Template deleted!')

    # Clear the Entry field
    voterinfo1.delete(0, END)
    root.destroy()

# Function to create a window for deleting a voter
def delete(): 
    global existing_root  # Declare the variable as global to modify it inside the function

    # Check if there is an existing root window and it's not closed
    if existing_root and existing_root.winfo_exists():
        existing_root.destroy()

    global voterinfo1, Canvas1, con, cur, voterTable, root
    
    # Creating GUI window
    root = Toplevel(bg="#242424")
    root.title("Delete Voter")
    root.minsize(width=400, height=400)
    root.geometry("600x500")

    Canvas1 = Canvas(root)
    Canvas1.config(bg="#242424")
    Canvas1.pack(expand=True, fill=BOTH)
        
    headingFrame1 = Frame(root, bg="#2b2b2b")
    headingFrame1.place(relx=0, rely=0, relwidth=1, relheight=0.23)
        
    headingLabel = Label(headingFrame1, text="Delete Voter", bg="#2b2b2b", fg='white', font=('Courier', 15))
    headingLabel.place(relx=0, rely=0, relwidth=1, relheight=1)
    
    labelFrame = Frame(root, bg="#2b2b2b")
    labelFrame.place(relx=0.1, rely=0.3, relwidth=0.8, relheight=0.5)   
        
    # Label and Entry field for Voter ID
    lb2 = Label(labelFrame, text="Voter ID: ", bg="#2b2b2b", fg='white')
    lb2.place(relx=0.05, rely=0.5)
        
    voterinfo1 = Entry(labelFrame, bg="#353638", fg="white")
    voterinfo1.place(relx=0.3, rely=0.5, relwidth=0.62)
    
    # Submit Button
    SubmitBtn = Button(root, text="SUBMIT", bg='#1f69a6', fg='white', command=deletevoter)
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