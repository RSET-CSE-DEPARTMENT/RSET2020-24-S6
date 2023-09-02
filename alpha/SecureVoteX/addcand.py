#Importing necessary header files
from tkinter import *
import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk
import pymysql
import sqlite3
from tkinter import filedialog
from tkinter.font import Font

# Initialize a connection to the SQLite database
con = sqlite3.connect(database="SecureVoteX.db")
cur = con.cursor()  # Create a cursor to interact with the database

existing_window = None

def addCand():
    
    def register():
        name = name_entry.get()#To get value from the entry widget
        uid = uid_entry.get()#To get value from the entry widget
        candTable = "candidates"
        insertCand = "insert into "+candTable+" values('"+uid+"','"+name+"','"+image_path+"')"#To insert into candTable
        try:
            cur.execute(insertCand)  # Execute the SQL insert query
            con.commit()  # Commit the changes to the database
            messagebox.showinfo('Success', "Candidate added successfully")
        except:
            messagebox.showinfo("Error", "Can't add candidate into Database")

        print(uid)
        print(name)
        print(image_path)

    def browse_image():
        global image_path
        image_path = filedialog.askopenfilename(filetypes=[("JPG files", "*.jpg")])
        image_label.config(text="Selected Image: " + image_path)
    
    global existing_window  # Declare the variable as global to modify it inside the function

    if existing_window and existing_window.winfo_exists():  # Check if the existing window exists and is not closed
        existing_window.destroy()

    window = tk.Tk()
    window.title("Candidate Registration")
    window.geometry("600x500")  # Set the window size to 400x300 pixels
    window.configure(bg="#2b2b2b")  # Set background color

    # Custom font
    heading_font = Font(family="Helvetica", size=20, weight="bold")
    label_font = Font(family="Helvetica", size=12, weight="bold")
    button_font = Font(family="Helvetica", size=12)

    # Initialize a connection to the SQLite database (again, for clarity)
    con = sqlite3.connect(database="SecureVoteX.db")
    cur = con.cursor()  # Create a cursor to interact with the database

    frame = tk.Frame(window, bg="#242424")
    frame.pack(fill="x", pady=10)

    # Heading label
    heading_label = tk.Label(frame, text="Candidate Registration", font=heading_font, fg="#FFFFFF", bg="#242424")
    heading_label.pack(pady=5)


