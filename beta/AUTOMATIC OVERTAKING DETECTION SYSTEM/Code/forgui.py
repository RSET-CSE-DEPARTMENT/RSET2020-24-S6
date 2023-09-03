import re
import tkinter
from tkinter import FLAT

import customtkinter
from PIL import ImageTk, Image
from plyer import notification
from pyrebase import pyrebase

import For_pass

customtkinter.set_appearance_mode("System")  # Modes: system (default), light, dark
customtkinter.set_default_color_theme("green")  # Themes: blue (default), dark-blue, green
app1 = customtkinter.CTk()  # creating cutstom tkinter window
app1.geometry("350x220")
app1.title('Reset Password')

def validate_pass(number):
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$'
    if re.match(pattern, number):
        return True
    else:
        return False
def but(e1,e2,db,ema,):
    p1=e1.get()
    p2=e2.get()
    if validate_pass(p1):
        if p1 == p2:
            try:

                notification.notify(
                    title='AODS',
                    message='Password Changes Successful',
                    app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                    # Set to a file path to use a custom icon
                    timeout=10)
                #db.child("Users").child(ema).child("Password").set(p1)
            except Exception as e:
                print(e)
        else:
            notification.notify(
                title='AODS',
                message='Password Doesn\'t Match',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10)
    else:
        notification.notify(
            title='AODS',
            message='Should contain 8 characters including lowercase,uppercase and digits',
            app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
            # Set to a file path to use a custom icon
            timeout=10, toast=True, ticker='AODS'
            # Duration in seconds for the notification to stay on the screen
        )
def hide(entry21, hide_image1, show_image1):
    show_button = tkinter.Button(app1, image=hide_image1, command=lambda: show(entry21, hide_image1, show_image1),
                                 relief=FLAT,
                                 activebackground="grey"
                                 , borderwidth=0, background="#343638", cursor="hand2")
    show_button.place(x=340, y=100)
    entry21.configure(show='*')


def show(entry21, hide_image1, show_image1):
    hide_button = tkinter.Button(app1, image=show_image1, command=lambda: hide(entry21, hide_image1, show_image1),
                                 relief=FLAT,
                                 activebackground="white"
                                 , borderwidth=0, background="#343638", cursor="hand2")
    hide_button.place(x=340, y=100)
    entry21.configure(show='')


def hide1(entry21, hide_image1, show_image1):
    show_button = tkinter.Button(app1, image=hide_image1, command=lambda: show1(entry21, hide_image1, show_image1),
                                 relief=FLAT,
                                 activebackground="grey"
                                 , borderwidth=0, background="#343638", cursor="hand2")
    show_button.place(x=340, y=160)
    entry21.configure(show='*')


def show1(entry21, hide_image1, show_image1):
    hide_button = tkinter.Button(app1, image=show_image1, command=lambda: hide1(entry21, hide_image1, show_image1),
                                 relief=FLAT,
                                 activebackground="white"
                                 , borderwidth=0, background="#343638", cursor="hand2")
    hide_button.place(x=340, y=160)
    entry21.configure(show='')


def passgui(database,ema0):
    print(ema0)
    hide_image = ImageTk.PhotoImage(Image.open(r".\images\hide2.png"))
    show_image = ImageTk.PhotoImage(Image.open(r".\images\show1.png"))
    entry0 = customtkinter.CTkLabel(master=app1, width=250, text='Reset Password')
    entry0.place(x=50, y=25)
    entry1 = customtkinter.CTkEntry(master=app1, width=250, placeholder_text='Password', show='*')
    entry1.place(x=50, y=75)
    entry2 = customtkinter.CTkEntry(master=app1, width=250, placeholder_text='Confirm Password', show='*')
    entry2.place(x=50, y=125)
    show_button = tkinter.Button(app1, image=hide_image, command=lambda: show(entry1, hide_image, show_image),
                                 relief=FLAT,
                                 activebackground="grey"
                                 , borderwidth=0, background="#343638", cursor="hand2")
    show_button.place(x=340, y=100)
    show_button1 = tkinter.Button(app1, image=hide_image, command=lambda: show1(entry2, hide_image, show_image),
                                  relief=FLAT,
                                  activebackground="grey"
                                  , borderwidth=0, background="#343638", cursor="hand2")
    show_button1.place(x=340, y=160)
    button = customtkinter.CTkButton(master=app1, width=100, text='Submit', command=lambda: but(entry1, entry2,database,ema0))
    button.place(x=50, y=175)

    app1.mainloop()
