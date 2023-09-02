#Import necessary header files
from tkinter import *
import PIL.Image
from PIL import *
import sqlite3
from fcon import loading_window
from fcon import f
from admin import *
from user import *
# Connect to the SQLite database
con = sqlite3.connect(database="SecureVoteX.db")
# Create a cursor object for database operations
cur = con.cursor()
loading_window()# Call the loading window function
# Create the main Tkinter window
root= Tk()
root.title("SecureVoteX")
root.minsize(width=600,height=500)
root.geometry("600x500")

# Adding a background image
background_image =PIL.Image.open("finger.jpg")
[imageSizeWidth, imageSizeHeight] = background_image.size

img = ImageTk.PhotoImage(background_image)
Canvas1 = Canvas(root)
Canvas1.create_image(300,340,image = img)      
Canvas1.config(bg="#11262b",width = imageSizeWidth, height = imageSizeHeight)
Canvas1.pack(expand=True,fill=BOTH)

# Create a frame for the heading
headingFrame1 = Frame(root,bg="#FFFFFF",bd=0.5)
headingFrame1.place(relx=0.2,rely=0.1,relwidth=0.6,relheight=0.16)

# Add a heading label
headingLabel = Label(headingFrame1, text="SecureVoteX", bg='#2b2b2b', fg='white', font=('Comic Sans MS',20,'bold'))
headingLabel.place(relx=0,rely=0, relwidth=1, relheight=1)

# Define a function for the admin page
def adminPage():
        ## Tries to initialize the fingerprint sensor
        try:

            if not f.verifyPassword():
                raise ValueError('The given fingerprint sensor password is wrong!')

        except Exception as e:
            messagebox.showerror('Error', 'Fingerprint sensor could not be initialized!\nException message: ' + str(e),parent=root)
            return

        ## Search for a fingerprint 
        try:
            messagebox.showinfo('Fingerprint Authentication', 'Waiting for fingerprint...',parent=root)

            while not f.readImage():#wait for fingerprint
                pass

            f.convertImage(FINGERPRINT_CHARBUFFER1) #image buffer, char buffer
            #get the fingerprint details
            result = f.searchTemplate()

            positionNumber = result[0]
            accuracyScore = result[1]

            if positionNumber == -1:
                messagebox.showerror('Authentication Failed', 'Fingerprint authentication failed. No match found!',parent=root)
                return
            elif positionNumber == 1 or positionNumber == 7:
                messagebox.showinfo('WELCOM ADMIN !!!', 'Fingerprint authentication successful!\nWELCOM ADMIN ' +
                                    str(positionNumber),parent=root )    
                Admin()
                
            else:
                messagebox.showerror('Authentication Failed', 'Fingerprint authentication failed. No match found!',parent=root)
                return
                # Continue with admin tasks
                

        except Exception as e:
            messagebox.showerror('Error', 'Fingerprint authentication failed!\nException message: ' + str(e),parent=root)

# Create a button for the admin page   
btn2 = Button(root,text="ADMIN",bg='#1f69a6', fg='white',command=adminPage)
btn2.place(relx=0.4,rely=0.4, relwidth=0.2,relheight=0.1)

# Create a button for the user page
btn5 = Button(root,text="USER",bg='#1f69a6', fg='white',command=userPage)
btn5.place(relx=0.4,rely=0.7, relwidth=0.2,relheight=0.1)

# Start the main event loop for the Tkinter application
root.mainloop()