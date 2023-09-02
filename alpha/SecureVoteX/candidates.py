# Import necessary header files
from PIL import Image, ImageTk
import hashlib
import sqlite3
import tkinter as tk
from tkinter import messagebox as m
existing_root = None
# Connect to the SQLite database
con = sqlite3.connect(database="SecureVoteX.db")
# Create a cursor object for database operations
cur = con.cursor()
candTable = "candidates"
encryptTable = "encryptTable"

# Define the main function for the voting application
def cand():
    candidate_buttons = []
    
# Function to encrypt data using SHA-256 hash
    def encrypt_data(data):
        hashed_data = hashlib.sha256(data.encode()).hexdigest()
        return hashed_data
    
# Function to handle button clicks (voting)
    def btn_click(candidate_id):
        encrypted_id = encrypt_data(candidate_id)
        print("Encrypted Candidate ID:", encrypted_id)

        try:
            # Check if the encrypted ID already exists in the table
            cur.execute("SELECT * FROM " + encryptTable + " WHERE encryptid=?", [encrypted_id])
            result = cur.fetchone()

            if result:
                # If the encrypted ID exists, update the vote count
                enc_vote = result[1] + 1
                cur.execute("UPDATE " + encryptTable + " SET count = ? WHERE encryptid = ?", (enc_vote, encrypted_id))
            else:
                # If the encrypted ID doesn't exist, insert a new row
                cur.execute("INSERT INTO " + encryptTable + " VALUES (?, 1)", (encrypted_id,))
            
            con.commit()
            m.showinfo("Vote Done", "Vote Successful",parent=root)
            from user import userPage
            root.destroy()
            userPage()#Creating new user window after deleting old window 
        except Exception as e:
            m.showerror("Failed to store encrypted ID", str(e),parent=root)
# Function to count votes
    def count_votes():
        try:
            cur.execute("SELECT encryptid, count FROM " + encryptTable) 
            rows = cur.fetchall()
            for row in rows:
                encryptid = row[0]
                vote_count = row[1]
                print("Encrypted ID:", encryptid)
                print("Vote Count:", vote_count)
                print("")

        except Exception as e:
            m.showerror("Failed to count votes", str(e),parent=root)
    global existing_root  # Declare the variable as global to modify it inside the function

    if existing_root and existing_root.winfo_exists():  # Check if the existing root exists and is not closed
        existing_root.destroy()

 # Create a new tkinter window
    root = tk.Toplevel()
    root.title("Candidates List")
    root.geometry("600x500")

# Create the main frame  
    main_frame = tk.Frame(root, bg="#2b2b2b")
    main_frame.pack(expand=True, fill=tk.BOTH)
        
    white_frame = tk.Frame(main_frame, bg="#353638")
    white_frame.place(relx=0, rely=0.2, relwidth=1, relheight=0.67)
    canvas = tk.Canvas(white_frame, bg="#353638")
    canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

    scrollbar = tk.Scrollbar(white_frame, command=canvas.yview)
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

    canvas.config(yscrollcommand=scrollbar.set)
    canvas.bind('<Configure>', lambda e: canvas.configure(scrollregion=canvas.bbox("all")))
    candidate_frame = tk.Frame(canvas, bg="#353638")
    canvas.create_window ((0, 0), window=candidate_frame, anchor='nw')
    headingFrame1 = tk.Frame(root, bg="#2b2b2b", bd=5)
    headingFrame1.place(relx=0, rely=0, relwidth=1, relheight=0.2)

    headingLabel = tk.Label(headingFrame1, text="Click on the image to Vote!!!", bg='#2b2b2b', fg='white', font=('Courier', 15))
    headingLabel.place(relx=0, rely=0, relwidth=1, relheight=1)

 # SQL query to fetch candidates from the database
    getCand = "SELECT * FROM " + candTable

    rows_in_row = 4
    row_index = 0
    column_index = 0
    try:
        cur.execute(getCand)
        con.commit()
        for i, candidate in enumerate(cur):
            candidate_id = candidate[0]  # Assuming the candidate ID is stored in the first column of the candidate table
            candidate_name = candidate[1]
            image_path = candidate[2]  # Assuming the image path is stored in the third column of the candidate table

            # Load and resize the image
            image = Image.open(image_path)
            image = image.resize((100, 100), Image.ANTIALIAS)

            # Create a PhotoImage object from the resized image
            photo = ImageTk.PhotoImage(image)

            frame = tk.Frame(candidate_frame, bg="#1f69a6")
            frame.grid(row=i // rows_in_row, column=column_index, padx=20, pady=20, sticky="nsew")

            # Create a label with the candidate's image as a button
            image_button = tk.Button(frame, image=photo,activebackground="green", command=lambda id=candidate_id: btn_click(id))
            image_button.image = photo  # Store a reference to the PhotoImage object to avoid garbage collection
            image_button.pack()

            # Create a label with the candidate's name
            name_label = tk.Label(frame, text=candidate_name, fg='white',bg='#1f69a6')
            name_label.pack()

            # Append the button to the candidate_buttons list
            candidate_buttons.append(image_button)

            column_index += 1
            if column_index >= rows_in_row:
                column_index = 0
                row_index += 1
    except Exception as e:
        m.showerror("Failed to fetch candidates from database", str(e),parent=root)

# Define a function to count votes and close the window
    def count_votes_and_quit():
        root.destroy()
        count_votes()
    
# Create a "Quit" button to count votes and close the window   
    quitBtn = tk.Button(root, text="Quit", bg='#1f69a6', fg='white', command=count_votes_and_quit)
    quitBtn.place(relx=0.4, rely=0.9, relwidth=0.18, relheight=0.08)

    root.protocol("WM_DELETE_root", on_close)# Configure a protocol to handle window close event
    existing_root = root # Set the existing_root variable to the current root window
    root.mainloop()# Start the main tkinter event loop

    count_votes()


def on_close():#To destroy the duplicate window created
    global existing_window  
    if existing_window:
        existing_window.destroy()  
    existing_window = None
