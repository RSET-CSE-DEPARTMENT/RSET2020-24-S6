#!/usr/bin/env python
import pyrebase
import os
import spidev
import time
from datetime import datetime, timedelta
import socket

# Check if internet connection is available
def CheckConnection():
    try:
       socket.create_connection(('Google.com', 80))
       return True
    except OSError:
        return False

# Keep checking for internet every 3 seconds until it's available
while True:
    conn_status = CheckConnection()
    if conn_status:
        break
    time.sleep(3)

# Firebase configuration
firebaseConfig = {
  "apiKey": "YOUR_API_KEY",
  "authDomain": "FIREBASE_PROJECT_DOMAIN",
  "databaseURL": "DATABASE_URL",
  "storageBucket": "STORAGE_BUCKET"
}

# Initialise SPI device
spi = spidev.SpiDev()
spi.open(0, 0)

# Read data from sensor using MCP3008 ADC
def readadc(channel):
    adc_value = spi.xfer2([1, (8 + channel) << 4, 0])
    raw_value = ((adc_value[1] & 3) << 8) + adc_value[2]
    return raw_value

run = True

# Database listener for listening shutdown signal
def streamer(snap):
        global run
        if snap['data'] == 'Offline': # If 'data' reads Offline, shutdown the device
            run = False
            print('Shutting down')
            os.system('sudo shutdown now')

try:
    # Initialise firebase 
    firebase = pyrebase.initialize_app(firebaseConfig)
    db = firebase.database()

    # Setting status of device as online in the database
    db.child('status').set('Online')

    # Adding listener
    db.child('status').stream(streamer)

    
    i = 1
    while i <= 96 and run:
        # Get current date and time 
        curr_date = datetime.now().strftime("%d-%m-%Y")
        curr_time = datetime.now().replace(hour = 0, minute = 0)

        # Read data from MQ135 and MQ7 sensors
        mq135 = readadc(0) # MQ135 connected to channel 0 of MCP3008
        mq7 = readadc(1) # MQ7 connected to channel 1 of MCP3008

        # Add the data from sensors along with the date to database
        db.child('MQ135').child(curr_date).push({ curr_time.strftime('%H:%M') : mq135})
        db.child('MQ7').child(curr_date).push({ curr_time.strftime('%H:%M') : mq7})

        i += 1
        time.sleep(900) # Sleep for 15 minutes to read next set of data

except Exception as e:
    print(e)