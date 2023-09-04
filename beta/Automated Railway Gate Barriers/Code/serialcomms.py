import serial
import time
import schedule
arduino = serial.Serial('com3', 115200)##locks the port
print('Established serial connection to Arduino')
cmd="15"
cmd=str(cmd)
time.sleep(2)
arduino.write(cmd.encode())
time.sleep(2)
comm="FCLOSE"
time.sleep(2)
arduino.write(comm.encode())
time.sleep(2)
comm="FOPEN"
time.sleep(2)
arduino.write(comm.encode())
time.sleep(2)
print("DONE")
"""a=arduino.readline().decode()                                                                                                                                                                                                                                                   
a=a.strip()
if(a=="DONE"):
    cmd=input()
    arduino.writ    e(cmd.encode())"""
"""arduino_data = arduino.readline()Hell
    decoded_values = str(arduino_data[0:len(arduino_data)].decode("utf-8"))
    list_values = decoded_values.split('x')
    for item in list_values:
        list_in_floats.append(float(item))
    print('Collected readings from Arduino: {list_in_floats}')
    arduino_data = 0
    list_in_floats.clear()
    list_values.clear()
    arduino.close()
    print('Connection closed')
    print('<----------------------------->')
list_values = []
list_in_floats = []1
print('Program started')
schedule.every(10).seconds.do(main_func)
while True:
    schedule.run_pending()
    time.sleep(1) """