#import necessary header files
from serial.tools import list_ports
from pyfingerprint.pyfingerprint import PyFingerprint
from tkinter import *
from tkinter.ttk import Progressbar
from PIL import Image, ImageTk
import time
def loading_window():
    #creation of gui elements
    root = Tk()
    root.title("Loading...")
    root.geometry("600x500")
    root.configure(bg="#242424")

    # Resizing the logo image
    logo_image = Image.open("Front_load.png")
    logo_image = logo_image.resize((200, 200), Image.LANCZOS)
    logo_photo = ImageTk.PhotoImage(logo_image)

    logo_label = Label(root, image=logo_photo, bg="#242424")
    logo_label.place(relx=0.51, rely=0.4, anchor=CENTER)

    # Loading bar
    progress_var = DoubleVar()
    progress_bar = Progressbar(root, variable=progress_var, length=300, mode='indeterminate')
    progress_bar.place(relx=0.5, rely=0.8, anchor=CENTER)

    def start_loading(): # to start the loading bar
        for i in range(1, 101):
            progress_var.set(i)
            root.update_idletasks()
            time.sleep(0.03)
        root.destroy()

    # Start the loading process
    progress_bar.start(7000)  # Change the value inside start() to adjust the speed of the loading bar
    root.after(1, start_loading)  # Change the value inside after() to adjust the duration before starting the main window
    root.mainloop()

if __name__ == "__main__":
    loading_window()      
import sqlite3

# Create a connection to the database (or open it if it already exists)
con = sqlite3.connect(database="SecureVoteX.db")

# Create a cursor object to execute SQL commands
cursor = con.cursor()

# Create a table
cursor.execute('''CREATE TABLE IF NOT EXISTS encryptTable (
                    encryptid varchar(100) primary key,
                    count number
                    )''')
cursor.execute("CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value INTEGER)")
cursor.execute("INSERT OR IGNORE INTO settings (key, value) VALUES ('voting_enabled', 1)")
cursor.execute('''CREATE TABLE IF NOT EXISTS candidates (
                    uid varchar(30) primary key,
                    name varchar(30),
                    img varchar(100)
                )''')
cursor.execute('''CREATE TABLE IF NOT EXISTS voter (
                    uid varchar(30) primary key,
                    name varchar(30),
                    img varchar(100),
                    fid varchar(30) 
                )''')

con.commit()
con.close()
#to search for port where fingerprint sensor is connected
fingerprint_port = None
available_ports = list(list_ports.comports()) #to get list of all available ports in system
for port in available_ports:
    try:
        f = PyFingerprint(port.device, 57600, 0xFFFFFFFF, 0x00000000) #to establish fingerprint connection
        if f.verifyPassword():
            fingerprint_port = port.device
            print("Fingerprint sensor found1 on port:", fingerprint_port)
            
            break  # Break out of the for loop when the sensor is found
    except Exception as e:
        pass
if fingerprint_port:
    print("Fingerprint sensor found on port:", fingerprint_port)
    # Continue with your fingerprint sensor operations here
else:
    print("Fingerprint sensor not found.")
