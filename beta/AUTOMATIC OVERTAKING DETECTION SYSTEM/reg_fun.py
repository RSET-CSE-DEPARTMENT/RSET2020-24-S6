from pyrebase import pyrebase
from plyer import notification
from win10toast import ToastNotifier
import re


def validate_pass(number):
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$'
    if re.match(pattern, number):
        return True
    else:
        return False


def has_numbers(name):
    for char in name:
        if not char.isalpha():
            return True
    return False


def has_chars(name):
    for char in name:
        if char.isalpha():
            return True
    return False


def reg_func(user, middle, last, email, mob, passw, passc, database):
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

    try:
        snapshot = database.child("Users").get()
        if email in snapshot.val():
            notification.notify(
                title='AODS',
                message='User Already Registered',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
            return False
        elif user == "" or email == "" or mob == "" or passw == "" or passc == "" or last == "":
            notification.notify(
                title='AODS',
                message='Fields cannot be empty',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
            return False
        elif has_numbers(user):
            notification.notify(
                title='AODS',
                message='Name Field should contain only Alphabets',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
            return False
        elif has_chars(mob):
            notification.notify(
                title='AODS',
                message='Mobile Number Should Contain Only numericals',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
            return False
        elif len(mob) != 10:
            notification.notify(
                title='AODS',
                message='Mobile number should contain 10 digits',
                app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                # Set to a file path to use a custom icon
                timeout=10, toast=True, ticker='AODS'
                # Duration in seconds for the notification to stay on the screen
            )
            return False
        else:

            if passw == passc:
                if validate_pass(passw):
                    email1=email.replace(".", "," )
                    database.child("Users").child(email1).child("Name").set(user)
                    database.child("Users").child(email1).child("Middle").set(middle)
                    database.child("Users").child(email1).child("Last").set(last)
                    database.child("Users").child(email1).child("Mobile").set(mob)
                    database.child("Users").child(email1).child("Password").set(passw)
                    notification.notify(
                        title='AODS',
                        message='User Added Successfully',
                        app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                        # Set to a file path to use a custom icon
                        timeout=10, toast=True, ticker='AODS'
                        # Duration in seconds for the notification to stay on the screen
                    )
                    return True
                else:
                    notification.notify(
                        title='AODS',
                        message='Should contain 8 characters including lowercase,uppercase and digits',
                        app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                        # Set to a file path to use a custom icon
                        timeout=10, toast=True, ticker='AODS'
                        # Duration in seconds for the notification to stay on the screen
                    )
                    return False
            else:
                notification.notify(
                    title='AODS',
                    message='Password Doesn\'t Match',
                    app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
                    # Set to a file path to use a custom icon
                    timeout=10, toast=True, ticker='AODS'
                    # Duration in seconds for the notification to stay on the screen
                )
                return False
    except Exception as e:
        print(e)
        notification.notify(
            title='AODS',
            message='Connection Failed With Firebase',
            app_icon="C:\\Users\\DELL\\Downloads\\istockphoto-1085043668-612x612 (4).ico",
            # Set to a file path to use a custom icon
            timeout=10, toast=True, ticker='AODS'
            # Duration in seconds for the notification to stay on the screen
        )
