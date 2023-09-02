# Importing necessary header files
import tkinter as tk
import hashlib
import sqlite3
from tkinter import messagebox as mbox
from PIL import Image, ImageTk

# Initialize a variable to store an existing root window (if any)
existing_window = None

# Establish a connection to the SQLite database
con = sqlite3.connect(database="SecureVoteX.db")
cur = con.cursor()

candTable = "candidates"   # Define the name of the candidates table in the database
encryptTable = "encryptTable"   # Define the name of the encryptTable in the database

# Function to encrypt data using SHA-256 hashing
def encrypt_data(data):
    hashed_data = hashlib.sha256(data.encode()).hexdigest()
    return hashed_data

# Function to view election results
def viewResult():
    global existing_window

    # Close any existing result window before creating a new one
    if existing_window and existing_window.winfo_exists():
        existing_window.destroy()
    root = tk.Toplevel()
    root.title("Results")
    root.geometry("600x500")

    # Create the heading frame
    headingFrame1 = tk.Frame(root, bg="#242424")
    headingFrame1.place(relx=0, rely=0, relwidth=1, relheight=0.2)
    headingLabel = tk.Label(headingFrame1, text="Election Results", bg="#242424", fg='white', font=('Courier', 15))
    headingLabel.place(relx=0, rely=0, relwidth=1, relheight=1)

    # Create left and right frames for displaying results
    left_frame = tk.Frame(root, bg="#2b2b2b")
    left_frame.place(relx=0, rely=0.2, relwidth=0.5, relheight=0.9)
    right_frame = tk.Frame(root, bg="#2b2b2b")
    right_frame.place(relx=0.5, rely=0.2, relwidth=0.5, relheight=0.9)

    # Create scrollbars for both frames
    scrollbar = tk.Scrollbar(left_frame, orient="vertical", bg="#242424")
    scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
    s = tk.Scrollbar(right_frame, orient="vertical", bg="#242424")
    s.pack(side=tk.RIGHT, fill=tk.Y)

    # Create Text widgets to display results
    t = tk.Text(left_frame, bg='#2b2b2b', fg='white', yscrollcommand=scrollbar.set)
    t.tag_config('header', justify='left')
    t.insert("1.0", "", 'header')

    t2 = tk.Text(right_frame, bg='#2b2b2b', fg='white', yscrollcommand=s.set)
    t2.tag_config('header', justify='left')
    t2.insert("1.0", "", 'header')

    try:
        # Fetch candidates from the database
        cur.execute(f"SELECT * FROM {candTable}")
        candidates = cur.fetchall()

        max_vote_count = -1
        winners = []
        winner_image_paths = []

        # Loop through candidates and calculate vote counts
        for candidate in candidates:
            candidate_id = candidate[0]
            candidate_name = candidate[1]

            # Encrypt the candidate ID to match the stored data
            encrypted_id = encrypt_data(str(candidate_id))

            cur.execute("SELECT * FROM " + encryptTable + " WHERE encryptid=?", [encrypted_id])
            result = cur.fetchone()

            if result:
                vote_count = result[1]
                if vote_count > max_vote_count:
                    max_vote_count = vote_count
                    winners = [candidate_name]
                    winner_image_paths = [candidate[2]]
                elif vote_count == max_vote_count:
                    winners.append(candidate_name)
                    winner_image_paths.append(candidate[2])
            else:
                vote_count = 0

            # Display candidate information in the left Text widget
            label_text = f"Candidate Name: {candidate_name}\nVote Count: {vote_count}\n\n"
            t.insert(tk.END, label_text, 'body')

        t.config(state=tk.DISABLED)

        # Display the winner(s) in the right Text widget
        if winners:
            row_count = len(winners)
            image_frame = tk.Frame(right_frame, bg="#2b2b2b")
            image_frame.place(relx=0.5, rely=0.45, anchor=tk.CENTER)
            image_references = []

            if len(winners) > 1:  # Multiple winners (tie) details
                t2.insert(tk.END, "\tTie!!\n", 'header')
                for i in range(row_count):
                    # Insert the winner images
                    image_path = winner_image_paths[i]
                    image = Image.open(image_path)
                    image = image.resize((100, 100), Image.LANCZOS)
                    photo = ImageTk.PhotoImage(image)

                    t2.image_create("end", image=photo)
                    image_references.append(photo)
                    t2.insert("end", "\n" + "%-10s" % (winners[i]) + "\n")

                t2.insert("end", "%-10s" % ("Vote Count:") + str(max_vote_count) + "\t\n")
                t2.config(state=tk.DISABLED)

            else:  # Single winner details
                # Insert the winner image 
                image_path = winner_image_paths[0]
                image = Image.open(image_path)
                image = image.resize((100, 100), Image.LANCZOS)
                photo = ImageTk.PhotoImage(image)
                image_label = tk.Label(image_frame, image=photo, bg="#2b2b2b")
                image_label.image = photo
                image_label.grid(row=0, column=0, padx=10, pady=10)

                winner_label_text = f"Winner: {winners[0]}"
                winner_label = tk.Label(image_frame, text=winner_label_text, bg="#2b2b2b", fg="white",
                                         justify=tk.CENTER)
                winner_label.grid(row=1, column=0, padx=10, pady=10, columnspan=2)

                t2.insert(tk.END, f"Winner: {winners[0]}\n")
                t2.insert(tk.END, "%-10s" % ("Vote Count:") + str(max_vote_count) + "\n")

        else:
            t2.insert(tk.END, "No winners found", 'header')

    except Exception as e:
        mbox.showinfo("Error", str(e))

    # Configure and pack scrollbars and Text widgets
    scrollbar.config(command=t.yview)
    t.pack(fill=tk.BOTH, expand=True)
    s.config(command=t2.yview)
    t2.pack(fill=tk.BOTH, expand=True)

    # Set a protocol handler to handle window close event
    root.protocol("WM_DELETE_ROOT", on_close)
    existing_window = root

    root.mainloop()

def on_close(): # To destroy the duplicate window created
    global existing_window
    if existing_window:
        existing_window.destroy()
    existing_window = None
