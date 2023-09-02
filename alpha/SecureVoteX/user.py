#import all necessary header files
from pyfingerprint.pyfingerprint import PyFingerprint
from pyfingerprint.pyfingerprint import FINGERPRINT_CHARBUFFER1
from fcon import f
from tkinter import *
import tkinter as tk
from PIL import ImageTk, Image
from tkinter import messagebox
from candidates import cand
import sqlite3

def userPage():
    conn = sqlite3.connect('SecureVoteX.db') #connect with database
    cursor = conn.cursor()
    cursor.execute("SELECT value FROM settings WHERE key = 'voting_enabled'")
    voting_enabled = bool(cursor.fetchone()[0])
    conn.close()

    if not voting_enabled: #check if voting is enabled or not
        messagebox.showerror('Voting Stopped', 'Voting has been stopped by the admin.')
        return


    dup=open('dup.txt','a+')  #open text file to insert duplicate fingerprint ids
    dup.seek(0)
        ## Tries to initialize the fingerprint sensor
    try:
            if not f.verifyPassword():
                raise ValueError('The given fingerprint sensor password is wrong!')

    except Exception as e:
            messagebox.showerror('Error', 'Fingerprint sensor could not be initialized!\nException message: ' + str(e))
            return

        ## Search for a fingerprint 
    try:
            messagebox.showinfo('Fingerprint Authentication', 'Waiting for fingerprint...')
            # to wait for fingerprint
            while not f.readImage():
                pass

            f.convertImage(FINGERPRINT_CHARBUFFER1)
            #to get fingerprint details
            result = f.searchTemplate()

            positionNumber = result[0]
            accuracyScore = result[1]
            
            if positionNumber == -1 :
                messagebox.showerror('Authentication Failed', 'Fingerprint authentication failed. No match found!')
                return
            else:
                #to check if there is a duplicate fingerprint access
                with open('dup.txt', 'a+') as dup:
                    dup.seek(0)
                    for row in dup:
                        if row.strip() == str(positionNumber): 
                            messagebox.showerror('Duplicate Voting', 'Duplicate voting attempt detected!')
                            return
                    
                    dup.write(str(positionNumber) + '\n')
                messagebox.showinfo('Authentication Successful', 'Fingerprint authentication successful!\nPosition: ' +
                                        str(positionNumber) + '\nAccuracy Score: ' + str(accuracyScore))
                cand() #to display candidates on new window
                    

    except Exception as e:
            messagebox.showerror('Error', 'Fingerprint authentication failed!\nException message: ' + str(e))
