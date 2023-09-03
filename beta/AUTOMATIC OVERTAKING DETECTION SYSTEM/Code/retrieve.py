import os

import numpy
from pyrebase import pyrebase
import cv2
from datetime import datetime

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


def imgwrite(img):
    now = datetime.now()
    current_time = now.strftime("%d_%m_%Y_%H_%M_%S")
    filename = '%s.png' % current_time
    cv2.imwrite(os.path.join(r"C:\Users\Harikrishnan\PycharmProjects\mini_project\pythonProject\img", filename), img)


def reteieve():
    firebase = pyrebase.initialize_app(config)
    database = firebase.database()
    # database.child("Violator").set("hi")
    emily = database.child("Violator").child("1").child("Pic").get()
    # emily = list(emily.values())
    a = [];
    for i in emily.each():
        print(i.val())
        a.append(i.val())
    b = numpy.array(a)
    imgwrite(b)


def remove():
    firebase = pyrebase.initialize_app(config)
    database = firebase.database()
    database.child("Violators").remove()


reteieve()
