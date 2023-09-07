# importing required modules
import smtplib
import re
import tkinter
from tkinter import FLAT
import For_pass
import customtkinter
from PIL import ImageTk, Image
from plyer import notification
from pyrebase import pyrebase
import register
import Login

customtkinter.set_appearance_mode("System")  # Modes: system (default), light, dark
customtkinter.set_default_color_theme("green")  # Themes: blue (default), dark-blue, green

app = customtkinter.CTk()  # creating cutstom tkinter window
app.geometry("600x440")
app.title('Login')
config = {
    "apiKey": "AIzaSyCQ2jsvICouZs7m7TA27a2u0MIRiLEKFZE",
    "authDomain": "aods-668cc.firebaseapp.com",
    "database": "https://aods-668cc-default-rtdb.firebaseio.com",
    "projectId": "aods-668cc",
    "storageBucket": "aods-668cc.appspot.com",
    "messagingSenderId": "34841860662",
    "appId": "1:34841860662:web:bcfce82f0319dd1208d697",
    "measurementId": "G-SNMQQ84LS2",
    "databaseURL": "https://aods-668cc-default-rtdb.firebaseio.com",
    "serviceAccount": "aods-668cc-firebase-adminsdk-r20v3-238f70f53a.json"
}
firebase = pyrebase.initialize_app(config)
database = firebase.database()
snapshot1 = database.child("Users").get()


def validate_pass(number):
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$'
    if re.match(pattern, number):
        return True
    else:
        return False

def open_input_dialog_event1(u):
    dialog = customtkinter.CTkInputDialog(text="Enter New Password:", title="Reset Password",show="*")
    passw = dialog.get_input()
    if validate_pass(passw):
        open_input_dialog_event2(u,passw)
    else:
        notification.notify(
            title='AODS',
            message='Should contain 8 characters including lowercase,uppercase and digits',
            app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
            # Set to a file path to use a custom icon
            timeout=10, toast=True, ticker='AODS'
            # Duration in seconds for the notification to stay on the screen
        )
        open_input_dialog_event1(u)

def open_input_dialog_event2(u,pa):
    dialog = customtkinter.CTkInputDialog(text="Confirm New Password:", title="Reset Password",show="*")
    passe = dialog.get_input()
    if pa==passe:
        user1 = u.replace('.', ',')
        database.child("Users").child(user1).child("Password").set(passe)
        notification.notify(
            title='AODS',
            message='Password Changing Successful',
            app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
            # Set to a file path to use a custom icon
            timeout=10, toast=True, ticker='AODS'
            # Duration in seconds for the notification to stay on the screen
        )
    else:
        notification.notify(
            title='AODS',
            message='Password Doesn\'t Match',
            app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
            # Set to a file path to use a custom icon
            timeout=10, toast=True, ticker='AODS'
            # Duration in seconds for the notification to stay on the screen
        )
        open_input_dialog_event1(u)

def forgot_password():
    dialog = customtkinter.CTkInputDialog(text="Enter Username:", title="Reset Password",show="")
    user = dialog.get_input()
    if user is not None:
        try:
            u = database.child("Users").get()
            user1 = user.replace('.', ',')
            if user1 in u.val():
                print("k")
                open_input_dialog_event(user)
            else:
                notification.notify(
                    title='AODS',
                    message='User not Registered Contact Admin',
                    app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                    # Set to a file path to use a custom icon
                    timeout=10, toast=True, ticker='AODS'
                    # Duration in seconds for the notification to stay on the screen
                )
        except Exception as e:
            print(e)
    else:
        notification.notify(
                title='AODS',
                message='Enter username to Continue',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )

def open_input_dialog_event(u):
    config = {
        "apiKey": "AIzaSyCQ2jsvICouZs7m7TA27a2u0MIRiLEKFZE",
        "authDomain": "aods-668cc.firebaseapp.com",
        "database": "https://aods-668cc-default-rtdb.firebaseio.com",
        "projectId": "aods-668cc",
        "storageBucket": "aods-668cc.appspot.com",
        "messagingSenderId": "34841860662",
        "appId": "1:34841860662:web:bcfce82f0319dd1208d697",
        "measurementId": "G-SNMQQ84LS2",
        "databaseURL": "https://aods-668cc-default-rtdb.firebaseio.com",
        "serviceAccount": "aods-668cc-firebase-adminsdk-r20v3-238f70f53a.json"
    }
    firebase = pyrebase.initialize_app(config)
    database = firebase.database()
    snapshot1 = database.child("Users").get()
    dialog = customtkinter.CTkInputDialog(text="Enter OTP send to " + u + ":", title="Reset Password",show="*")
    o=For_pass.forpass(u)
    otp = dialog.get_input()
    if otp==o:
        notification.notify(
                title='AODS',
                message='Verification Complete',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
        print(u)
        open_input_dialog_event1(u)

    else:
        notification.notify(
                title='AODS',
                message='Verification Failed',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
def button_function():
    # database.child("Users").set("hi")
    # database.child("Users").child("admin").child("Pass").set("1234")
    snapshot = database.child("Users").get()
    user = entry1.get()
    print(user)
    user=user.replace('.',',')
    passw = entry2.get()

    if user in snapshot.val():
        emily = database.child("Users").child(user).child("Password").get()
        print(user)
        i = emily.val()
        if (i == passw):
            # progressbar_1.start()
            notification.notify(
                title='AODS',
                message='Login Successful',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
            app.destroy()
            Login.func4()
            # Login.func3()

        else:
            print("")

            notification.notify(
                title='AODS',
                message='Invalid Login',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10  # Duration in seconds for the notification to stay on the screen
            )
    else:
        notification.notify(
            title='AODS',
            message='Invalid Username',
            app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
            # Set to a file path to use a custom icon
            timeout=10)  # Duration in seconds for the notification to stay on the screen
        # app.destroy()  # destroy current window and creating new one
        # Login.func3()
img1 = ImageTk.PhotoImage(Image.open(r".\images\pattern.png"))
l1 = customtkinter.CTkLabel(master=app, image=img1)
l1.pack()

# creating custom frame
frame = customtkinter.CTkFrame(master=l1, width=320, height=360, corner_radius=15)
frame.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)

l2 = customtkinter.CTkLabel(master=frame, text="Log into AODS", font=('Century Gothic', 20))
l2.place(x=50, y=45)

entry1 = customtkinter.CTkEntry(master=frame, width=220, placeholder_text='Username')
entry1.place(x=50, y=110)

entry2 = customtkinter.CTkEntry(master=frame, width=220, placeholder_text='Password', show="*")
entry2.place(x=50, y=165)
# Create custom button
button1 = customtkinter.CTkButton(master=frame, width=220, text="Login", command=button_function, corner_radius=6)
button1.place(x=50, y=240)
def hide(entry21, hide_image1, show_image1):
    show_button = tkinter.Button(frame, image=hide_image1, command=lambda: show(entry21, hide_image1, show_image1),
                                 relief=FLAT,
                                 activebackground="grey"
                                 , borderwidth=0, background="#343638", cursor="hand2")
    show_button.place(x=310, y=212)
    entry21.configure(show='*')
def show(entry21, hide_image1, show_image1):
    hide_button = tkinter.Button(frame, image=show_image1, command=lambda: hide(entry21, hide_image1, show_image1),
                                 relief=FLAT,
                                 activebackground="white"
                                 , borderwidth=0, background="#343638", cursor="hand2")
    hide_button.place(x=310, y=212)
    entry21.configure(show='')
hide_image = ImageTk.PhotoImage(Image.open(r".\images\hide2.png"))
show_image = ImageTk.PhotoImage(Image.open(r".\images\show1.png"))
show_button = tkinter.Button(frame, image=hide_image, command=lambda: show(entry2, hide_image, show_image),
                             relief=FLAT,
                             activebackground="grey"
                             , borderwidth=0, background="#343638", cursor="hand2")
show_button.place(x=310, y=212)
l3 = tkinter.Button(
    frame,
    text="Forgot Password",
    fg="#206DB4",
    font=("yu gothic ui Bold", 12),
    bg="#2B2B2B",
    bd=0,
    activebackground="#272A37",
    activeforeground="#ffffff",
    cursor="hand2",
    command=lambda: forgot_password(),
)
l3.place(x=210, y=250)
app.mainloop()