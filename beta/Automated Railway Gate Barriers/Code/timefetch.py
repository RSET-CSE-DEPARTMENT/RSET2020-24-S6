import sqlite3
from datetime import *
import time as stime
import requests
import re
from bs4 import BeautifulSoup
import serial
import stationnameextract as se
import pynput
# Create a table if it doesn't exist
flag=0
while(True):
    try:
        stime.sleep(2)    
        # Connect to the database
        conn = sqlite3.connect('C:\\Users\\hp\\Train.db')  # Replace with the path to your database file
        # Create a cursor
        cursor = conn.cursor()  
        currdate=datetime.now()
        currtime=currdate.strftime("%H:%M")
        cursor.execute('''SELECT ARRIVAL FROM details ORDER BY ARRIVAL asc LIMIT 1''')
        lis=cursor.fetchall()
        time=lis[0]
        esttime=time[0]
        esttime=datetime.strptime(esttime,"%H:%M")
        esttime=esttime.time()
        currtime=currdate.time()
        difference=datetime.combine(date.min,esttime)-datetime.combine(date.min,currtime)
        difference=int(difference.total_seconds())
        print(difference)
        cursor.close()
        conn.close()  
        if(difference>240 and flag==1):
                arduino = serial.Serial('com3', 115200)##locks the port
                print('Established serial connection to Arduino')
                acomm="OPEN"
                arduino.flush()
                stime.sleep(15)
                arduino.write(acomm.encode())
                flag=0
                arduino.close()
        if(difference<240):
            if(flag==1):
                arduino = serial.Serial('com3', 115200)##locks the port
                print('Established serial connection to Arduino')
                acomm="OPEN"
                arduino.flush()
                stime.sleep(2)
                arduino.write(acomm.encode())
                flag=0
                arduino.close()
            if(difference > 0):
                arduino = serial.Serial('com3', 115200)##locks the port
                print('Established serial connection to Arduino')    
                difference=int(difference)
                difference-=3
                difference=str(difference)
                print(difference)
                stime.sleep(3)
                arduino.write(difference.encode())
                stime.sleep(3)
                status=arduino.readline().decode()
                status=status.strip()
                arduino.close()
                if(status=='DONE'):
                    conn = sqlite3.connect('C:\\Users\\hp\\Train.db')  # Replace with the path to your database file
                    # Create a cursor
                    cursor = conn.cursor()
                    cursor.execute('delete from details where ARRIVAL in(SELECT ARRIVAL FROM details ORDER BY ARRIVAL LIMIT 1)')
                    conn.commit()
                    cursor.close()
                    conn.close()
                    flag2=0
                    while(flag2==0):
                        conn = sqlite3.connect('C:\\Users\\hp\\Train.db')  # Replace with the path to your database file
                        # Create a cursor
                        cursor = conn.cursor()
                        cursor.execute('SELECT ARRIVAL FROM details ORDER BY ARRIVAL ASC LIMIT 1')
                        lis1=cursor.fetchall()
                        time=lis1[0]
                        esttime2=time[0]
                        print(esttime2)
                        esttime2=datetime.strptime(esttime2,"%H:%M")
                        esttime2=esttime2.time()
                        difference=datetime.combine(date.min,esttime2)-datetime.combine(date.min,esttime)
                        difference=int(difference.total_seconds())
                        if(difference<180):
                            arduino = serial.Serial('com3', 115200)##locks the port
                            print('Established serial connection to Arduino')   
                            temp=str(-1*difference+5)
                            print(temp)
                            arduino.flush()
                            stime.sleep(2)
                            arduino.write(temp.encode())
                            arduino.close()
                            cursor.execute('DELETE FROM details WHERE ARRIVAL IN(SELECT ARRIVAL FROM details ORDER BY ARRIVAL LIMIT 1)')
                            conn.commit()
                            esttime=esttime2
                            flag2=0
                        else:
                            flag2=1        
                    flag=1
            else:
                cursor.execute('DELETE FROM details WHERE ARRIVAL<="'+time[0]+'"')
                conn.commit()
                cursor.close()
                conn.close()                  
    except Exception as e:
        print(e)           
cursor.close()
conn.close()