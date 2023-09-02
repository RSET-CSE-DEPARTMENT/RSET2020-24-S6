#importing necessary header files
from tkinter import *
from PIL import ImageTk, Image
from tkinter import messagebox
from newvote import *
from delvot import *
from addcand import *
from viewcand import *
from viewvoter import *
from delcand import *
from view_result import *
import sqlite3

admin_window = None

def on_admin_window_close(): #to prevent duplicate window creation
    global admin_window
    admin_window.destroy()
    admin_window = None

def stop_voting(): #to stop voting process
    conn = sqlite3.connect('SecureVoteX.db') #to establish connection with database
    cursor = conn.cursor()
    cursor.execute("UPDATE settings SET value = ? WHERE key = ?", (0, 'voting_enabled')) # Update the voting status to False
    conn.commit()
    cursor.close()
    conn.close()

    messagebox.showinfo("Voting Stopped", "Voting has been stopped. No further votes will be accepted.",parent=admin_window) #display messagebox

def start_voting(): #to start voting process
    conn = sqlite3.connect('SecureVoteX.db') #to establish connection with database
    cursor = conn.cursor()
    cursor.execute("UPDATE settings SET value = ? WHERE key = ?", (1, 'voting_enabled')) # Update the voting status to True
    conn.commit()
    cursor.close()
    conn.close()

    messagebox.showinfo("Voting Started", "Voting has been started. Votes can now be cast.",parent=admin_window) #display messagebox

def view_results():
    conn = sqlite3.connect('SecureVoteX.db') #to establish connection with database
    cursor = conn.cursor()
    # Retrieve the voting status
    cursor.execute("SELECT value FROM settings WHERE key = 'voting_enabled'")
    result = cursor.fetchone()
    print(result)
    # Check if voting is enabled or disabled
    if result is None or result[0] == 1:
        messagebox.showerror("Voting in Progress", "Voting is currently in progress. Results cannot be viewed at the moment.",parent=admin_window)
    else:
        # Open the results window
        viewResult()

    cursor.close()
    conn.close()

def Admin():
    global admin_window

    if admin_window is None:
        # creation of gui elements
        admin_window = Toplevel()
        admin_window.protocol("WM_DELETE_WINDOW", on_admin_window_close)
        admin_window.lift()
        admin_window.title("ADMIN")
        admin_window.minsize(width=600, height=500)
        admin_window.geometry("400x400")

        Canvas1 = Canvas(admin_window)
        Canvas1.config(bg="#2b2b2b")
        Canvas1.pack(expand=True, fill=BOTH)

        headingFrame1 = Frame(admin_window, bg="#242424", bd=0.5)
        headingFrame1.place(relx=0, rely=0, relwidth=1, relheight=0.23)

        headingLabel = Label(headingFrame1, text="ADMIN", bg='#242424', fg='white',font=('Comic Sans MS', 20, 'bold'))
        headingLabel.place(relx=0, rely=0, relwidth=1, relheight=1)

        btn1 = Button(admin_window, text="NEW VOTER", bg='#1f69a6', fg='white', command=newvote)
        btn1.place(relx=0.1, rely=0.4, relwidth=0.2, relheight=0.1)

        btn4 = Button(admin_window, text="DELETE VOTER", bg='#1f69a6', fg='white', command=delete)
        btn4.place(relx=0.4, rely=0.4, relwidth=0.2, relheight=0.1)

        btn2 = Button(admin_window, text="VIEW CANDIDATES", bg='#1f69a6', fg='white', command=viewcand)
        btn2.place(relx=0.7, rely=0.6, relwidth=0.2, relheight=0.1)

        btn5 = Button(admin_window, text="NEW CANDIDATE", bg='#1f69a6', fg='white', command=addCand)
        btn5.place(relx=0.1, rely=0.6, relwidth=0.2, relheight=0.1)

        btn6 = Button(admin_window, text="DELETE CANDIDATE", bg='#1f69a6', fg='white', command=delc)
        btn6.place(relx=0.4, rely=0.6, relwidth=0.2, relheight=0.1)

        btn3 = Button(admin_window, text="VIEW VOTERS", bg='#1f69a6', fg='white', command=viewvote)
        btn3.place(relx=0.7, rely=0.4, relwidth=0.2, relheight=0.1)

        stopBtn = Button(admin_window, text="STOP VOTING", bg='RED', fg='white', command=stop_voting)
        stopBtn.place(relx=0.4, rely=0.8, relwidth=0.2, relheight=0.1)

        startBtn = Button(admin_window, text="START VOTING", bg='GREEN', fg='white', command=start_voting)
        startBtn.place(relx=0.1, rely=0.8, relwidth=0.2, relheight=0.1)

        viewResultsBtn = Button(admin_window, text="VIEW RESULTS", bg='#1f69a6', fg='white', command=view_results)
        viewResultsBtn.place(relx=0.7, rely=0.8, relwidth=0.2, relheight=0.1)

        admin_window.mainloop()
    else:
        admin_window.lift()
