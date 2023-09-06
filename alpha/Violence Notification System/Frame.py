import pytesseract
import cv2
from twilio.rest import Client
import sqlite3
from tkinter import *
from tkinter import messagebox, filedialog
from functools import partial
from tkinter import ttk
from PIL import ImageTk, Image
import os
import cv2
import numpy as np
from tensorflow import keras
from keras.models import load_model
from collections import deque
from fonttestCOPY import predict_frames
from tkinter import font

# Specify the height and width to which each video frame will be resized in our dataset.
IMAGE_HEIGHT, IMAGE_WIDTH = 64, 64

# Specify the number of frames of a video that will be fed to the model as one sequence.
SEQUENCE_LENGTH = 16

CLASSES_LIST = ["NonViolence", "Violence"]

MoBiLSTM_model = load_model()


output_video_file_path = r" "
filepath = ''


def athrize():
      uath=usernameath.get()
      path=passwordath.get()
      
      conn = sqlite3.connect("users.db")
      c = conn.cursor()
      c.execute("SELECT * FROM users WHERE username=? AND password=?", (uath, path))
      result = c.fetchone()
      conn.close()
      if result:
            messagebox.showinfo("authorization","success")
            show_frame(frame4)
      else:
            messagebox.showinfo("","Error") 
      
def register():
    username = usernamereg.get()
    password = passreg.get()

    conn = sqlite3.connect("users.db")
    c = conn.cursor()
    c.execute("INSERT INTO users VALUES (?, ?)", (username, password))
    conn.commit()
    conn.close()


def show_frame(frame):
	frame.tkraise()
	
def show_record():
    show_frame(frame3)   
   

def fileopen():
    global filepath  # Add this line
    file1 = filedialog.askopenfile(mode='r')
    filepath = os.path.abspath(file1.name)
    #l = Label(frame2, text=str(filepath)).pack()
    predict_frames(filepath, output_video_file_path, SEQUENCE_LENGTH)

def validateLogin(username,password):
     
      u1=username.get()
      p1=password.get()
      
      conn = sqlite3.connect("users.db")
      c = conn.cursor()
      c.execute("SELECT * FROM users WHERE username=? AND password=?", (u1, p1))
      result = c.fetchone()
      conn.close()
      if result:
            messagebox.showinfo("authorization","success")
            show_frame(frame2)
      else:
            messagebox.showinfo("","Error")       


root=Tk()

 
#root.state('zoomed')
root.geometry('800x800')
root.rowconfigure(0,weight=1)
root.columnconfigure(0,weight=1)
frame1=Frame(root)
frame2=Frame(root,bg='#c3dde0')
frame5=Frame(root)
frame3=Frame(root)
frame4=Frame(root)
frame1.grid(row=0,column=0,sticky='nesw')
frame2.grid(row=0,column=0,sticky='nesw')
frame3.grid(row=0,column=0,sticky='nesw')
frame4.grid(row=0,column=0,sticky='nesw')
frame5.grid(row=0,column=0,sticky='nesw')
#db
conn = sqlite3.connect('users.db')
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)")
#c.execute("INSERT INTO users (username,password) values ('athif','12345')")
conn.commit()
conn.close()
#frame5------------------------------------------------------------------------------------------------------------------------------------------

im5=Image.open(r'C:\Users\Dell\Desktop\violencedetectiontest\model test for vsc\FINAL\images\peakpx (1).jpg')


bg5=ImageTk.PhotoImage(im5)
bgi5=Label(frame5,image=bg5)
bgi5.place(x=0,y=0)
label5=Label(frame5,text="AUTHORIZE",font=('Arial',25),bg='#6685a2').pack()

usernameLabelath = Label(frame5, text="User Name",bg='#6685a2').pack(pady=10)
usernameath = StringVar()
usernameEntryath = Entry(frame5, textvariable=usernameath).pack() 


#password label and password entry box
passwordLabelath = Label(frame5,text="Password",bg='#6685a2').pack()  
passwordath = StringVar()
passwordEntryath = Entry(frame5, textvariable=passwordath, show='*').pack()  

#validateLogin = partial(validateLogin, usernameath, passwordath)

#login button
loginButtonath = Button(frame5, text="Login",command=athrize,height=1,width=10).pack(pady=10) 
athbutton = Button(frame5, text="home",command=lambda:show_frame(frame1),height=1,width=10).pack(pady=10) 

#frame4------------------------------------------------------------------------------------------------------------------------------------

im4=Image.open(r'C:\Users\Dell\Desktop\violencedetectiontest\model test for vsc\FINAL\images\peakpx.jpg')
bg4=ImageTk.PhotoImage(im4)
bgi4=Label(frame4,image=bg4)
bgi4.place(x=0,y=0)
lbel4=Label(frame4,text="REGISTER",font=('Arial,25'),bg='#6fd3d4').pack(padx=5)
usernameregLabel = Label(frame4, text="User Name",bg='#6fd3d4').pack()
usernamereg = StringVar()
usernameEntryreg = Entry(frame4, textvariable=usernamereg).pack() 
pregLabel = Label(frame4, text="Password",bg='#6fd3d4').pack()
passreg = StringVar()
passentryreg = Entry(frame4, textvariable=passreg,show='*').pack() 
regButton = Button(frame4, text="register",command=register,height=1,width=10).pack() 
hbutton = Button(frame4, text="home",command=lambda:show_frame(frame1),height=1,width=10).pack(pady=10) 
##frame1------------------------------------------------------------------------------------------------------------------------------------
im=Image.open(r'C:\Users\Dell\Desktop\violencedetectiontest\model test for vsc\FINAL\images\2.png')

bg=ImageTk.PhotoImage(im)
bgi=Label(frame1,image=bg)
bgi.place(x=0,y=0)
new_font = font.Font(family="Helvetica", size=45, weight="bold")

    # Apply the new font to the label



frame1title=Label(frame1,text='LOGIN PAGE',font=('Arial',30),bg='#dce2e8')
frame1title.config(font=new_font)
frame1title.pack()



usernameLabel = Label(frame1, text="User Name",font=('Arial',25),bg='#dce2e8').pack()
username = StringVar()
usernameEntry = Entry(frame1, textvariable=username,width=25).pack() 

#password label and password entry box
passwordLabel = Label(frame1,text="Password",font=('Arial',25),bg='#dce2e8').pack()  
password = StringVar()
passwordEntry = Entry(frame1, textvariable=password, show='*',width=25).pack()  

validateLogin = partial(validateLogin, username, password)

#login button
loginButton = Button(frame1, text="Login",command=validateLogin,height=1,width=14).pack(pady=25) 
signButton = Button(frame1, text="signup",command=lambda:show_frame(frame5),height=1,width=14).pack(pady=20)

#frame1.grid(row=0,column=0,sticky='nsew')

##frame2--------------------------------------------------------------------------------------------------------------------------------
im1=Image.open(r'C:\Users\Dell\Desktop\violencedetectiontest\model test for vsc\FINAL\images\601.jpg')
bg1=ImageTk.PhotoImage(im1)
bgi1=Label(frame2,image=bg1)
bgi1.place(x=0,y=0)
frame2title=Label(frame2,text="Main Page",font=('Arial',40),bg='#c3dde0').pack()
record = Button(frame2, text="show record",command=lambda:show_frame(frame3),height=2,width=10).pack(pady=20) 
Openfile=Button(frame2,text="Open File",command=fileopen,height=2,width=10).pack(pady=20)
logout=Button(frame2,text='Log Out',command=lambda:show_frame(frame1),height=2,width=10).pack(pady=20)
##frame3-----------------------------------------------------------------------------------------------------------------------------------------

im2 = Image.open(r'C:\Users\Dell\Desktop\violencedetectiontest\model test for vsc\FINAL\images\loginpg.jpg')
bg2 = ImageTk.PhotoImage(im2)
bgi2 = Label(frame3, image=bg2)
bgi2.place(x=0, y=0)
record_tree = ttk.Treeview(frame3)
record_tree['columns'] = ( "id", "videoname", "detection_time", "person_called")

    # Define the column headings
record_tree.column("#0", width=0, stretch=NO)
record_tree.column("id", anchor=W, width=120)
record_tree.column("videoname", anchor=CENTER, width=120)
record_tree.column("detection_time", anchor=W, width=120)
record_tree.column("person_called", anchor=W, width=120)

    # Set the column headings
record_tree.heading("#0", text="ID", anchor=W)
record_tree.heading("videoname", text="Video Name", anchor=W)
#record_tree.heading("detected_text", text="Detected Text", anchor=CENTER)
record_tree.heading("detection_time", text="Detection Time", anchor=W)
record_tree.heading("person_called", text="Person Called", anchor=W)

    # Connect to the SQLite database
conn = sqlite3.connect('violence.db')
cursor = conn.cursor()

    # Fetch all rows from the "violence" table
cursor.execute("SELECT * FROM violence")
rows = cursor.fetchall()

    # Insert rows into the Treeview widget
for row in rows:
    record_tree.insert(parent='', index='end', text=row[0], values=(row[0],row[1], row[2], row[3]))

    # Close the database connection
conn.close()

    # Pack the Treeview widget and show the record window
record_tree.pack(pady=20)
home = Button(frame3, text='Home', command=lambda: show_frame(frame2), height=2, width=10).pack(pady=20)
show_frame(frame1)
root.mainloop()