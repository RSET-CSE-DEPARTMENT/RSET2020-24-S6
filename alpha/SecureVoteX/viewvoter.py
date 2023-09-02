#Import necessary header files
from tkinter import *
import tkinter as tk
from tkinter import messagebox
import sqlite3
from PIL import Image,ImageTk
existing_root = None
# Connect to the SQLite database
con = sqlite3.connect(database="SecureVoteX.db")
# Create a cursor object for database operations
cur = con.cursor()

# Enter Table Names here
v = "voter" 

# Function to view the list of voters 
def viewvote(): 
    global existing_root  # Declare the variable as global to modify it inside the function
# Check if there's an existing root window and destroy it if it exists
    if existing_root and existing_root.winfo_exists():  # Check if the existing root exists and is not closed
        existing_root.destroy()
# Create a new Tkinter top-level window
    root = tk.Toplevel(bg="#242424")
    root.title("Voters List")
    root.minsize(width=400,height=400)
    root.geometry("600x500")
# Create a canvas for the window
    Canvas1 = Canvas(root) 
    Canvas1.config(bg="#242424")
    Canvas1.pack(expand=True,fill=BOTH)
        
# Create a heading frame       
    headingFrame1 = Frame(root, bg="#2b2b2b")
    headingFrame1.place(relx=0,rely=0,relwidth=1,relheight=0.23)

 # Add a heading label        
    headingLabel = Label(headingFrame1, text="Voters List", bg="#2b2b2b", fg='white', font=('Courier',15))
    headingLabel.place(relx=0,rely=0, relwidth=1, relheight=1)

# Create a label frame for displaying voter information
    labelFrame = Frame(root,bg="#2b2b2b")
    labelFrame.place(relx=0.1,rely=0.35,relwidth=0.8,relheight=0.52)
    y = 0.25
    labelFrame1 = Frame(root,bg='#1f69a6')
    labelFrame1.place(relx=0.1,rely=0.25,relwidth=0.8,relheight=0.1)
# Create a Text widget for displaying the voter information
    t = Text(labelFrame1, bg='#1f69a6',fg='white')
    t.tag_config('header', justify='left')
    t.insert("1.0", "%-10s" % ('UID') + "\t" + "%-30s" % ('NAME') + "\t" + "%-30s" % ('IMAGE') + "\n", 'header')
    t.insert("end", "--------------------------------------------------------------\n")
    t.pack()
# Create a scrollbar for the Text widget
    s = Scrollbar(labelFrame, orient=VERTICAL)
    s.pack(side=RIGHT, fill='y')

# Create a Text widget for displaying voter information with a scrollbar
    text = Text(labelFrame,bg='#2b2b2b',fg='white',yscrollcommand=s.set)
    text.tag_config('header', justify='left')
    text.tag_config('header', justify='left')
    text.insert("1.0", "", 'header')

# Query the database to fetch voter information
    getv = "select * from "+v
    try:
        cur.execute(getv)
        con.commit()
        image_references = []
# Iterate through the query results and display voter information
        for i in cur:
            text.insert("end", "%-10s" % (i[0]) + "\t" + "%-30s" % (i[1]) + "\t")
            print(i[0],i[1],i[2],i[3])
             # Load and display the voter's image
            ipath = str(i[2])
            print(ipath)
            try:
                image = Image.open(ipath)
                
                test = image.resize((50, 50)) 
                test = ImageTk.PhotoImage(test)
                text.image_create("end", image=test)
                image_references.append(test)
                
                
            except Exception as e:
                messagebox.showerror("Error loading image",str(e),parent=root)
            
            text.insert("end", "\n")
            y += 1

    except Exception as e:
        messagebox.showinfo("Failed to fetch files from database",str(e))
# Configure the scrollbar to work with the Text widget   
    s.config(command=text.yview)
    text.pack()
 # Create a "Quit" button to close the window
    quitBtn = Button(root,text="Quit",bg='#1f69a6', fg='white', command=root.destroy)
    quitBtn.place(relx=0.4,rely=0.9, relwidth=0.18,relheight=0.08)
    root.protocol("WM_DELETE_root", on_close)# Set a protocol for handling window closure

    existing_root = root  # Update the reference to the existing root

    root.mainloop()
def on_close():# To destroy the duplicate window created
    global existing_window 
    if existing_window:
        existing_window.destroy()  
    existing_window = None
