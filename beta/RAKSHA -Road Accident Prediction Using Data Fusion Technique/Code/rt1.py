from json import JSONDecoder

import serial
import time
import pyrebase
import numpy as np

# Establish serial communication with Arduino
arduino_port = 'COM6'  # Update with the correct serial port of your Arduino
arduino_baudrate = 9600
arduino = serial.Serial(arduino_port, arduino_baudrate)
time.sleep(2)  # Allow time for Arduino to establish connection

# Firebase configuration
firebase_config = {
    'apiKey': "AIzaSyAJ2-ljlBntiJIrVFoPFKgzeUfu8ZOuxYA",
    'authDomain': "raksha-648b6.firebaseapp.com",
    'databaseURL': "https://raksha-648b6-default-rtdb.firebaseio.com",
    'projectId': "raksha-648b6",
    'storageBucket': "raksha-648b6.appspot.com",
    'messagingSenderId': "737863321421",
    'appId': "1:737863321421:web:d7808918d77d0778839904"
}

# Initialize Firebase
firebase = pyrebase.initialize_app(firebase_config)
database = firebase.database()

# Kalman Filter parameters
dt = 0.1  # Time step
A = np.array([[1, dt], [0, 1]])  # State transition matrix
C = np.array([[1, 0], [0, 1]])  # Measurement matrix
Q = np.array([[1e-4, 0], [0, 1e-4]])  # Process noise covariance
R_ultrasonic = 0.1  # Measurement noise covariance for ultrasonic sensor
R_temperature = 0.5  # Measurement noise covariance for temperature sensor

# Initialize state variables
x = np.array([[0], [0]])  # Initial state (ultrasonic and temperature)
P = np.eye(2)  # Initial state covariance matrix

# Function to update the Kalman filter and return the filtered data
def update_kalman(z_ultrasonic, z_temperature):
    global x, P  # Declare x and P as global variables

    # Prediction step
    x_pred = np.dot(A, x)
    P_pred = np.dot(np.dot(A, P), A.T) + Q

    # Measurement update step
    z = np.array([[z_ultrasonic], [z_temperature]])
    y = z - np.dot(C, x_pred)
    S = np.dot(np.dot(C, P_pred), C.T) + np.array([[R_ultrasonic, 0], [0, R_temperature]])
    K = np.dot(np.dot(P_pred, C.T), np.linalg.inv(S))

    x = x_pred + np.dot(K, y)
    P = np.dot(np.eye(2) - np.dot(K, C), P_pred)

    # Return filtered data (ultrasonic and temperature)
    filtered_ultrasonic = x[0][0]
    filtered_temperature = x[1][0]

    return filtered_ultrasonic, filtered_temperature

def calculate_accident_probability(distance):
    if distance <= 30:
        return 100.0  # Set a high probability when the distance is less than the threshold
    elif distance > 30 and distance <= 50 :
        return 75.0  # Set a probability of 75% when the distance is between 75% and 100% of the threshold
    elif distance > 50 and distance <= 75:
        return 50.0  # Set a probability of 50% when the distance is between 50% and 75% of the threshold
    elif distance > 75 and distance <= 100:
        return 25.0  # Set a probability of 25% when the distance is between 25% and 50% of the threshold
    elif distance > 100:
        return 0.0  # Set 0% probability when the distance is above 25% of the threshold




# Perform TOPSIS algorithm on the data
import numpy as np
import csv

def topsis(X, weights, impact):
    # Normalize the decision matrix
    normalized_matrix = X / np.sqrt(np.sum(X**2, axis=0))

    # Multiply normalized matrix by weights to get weighted normalized matrix
    weighted_matrix = normalized_matrix * weights

    # Determine the ideal and negative-ideal solutions
    ideal_best = np.max(weighted_matrix, axis=0)
    ideal_worst = np.min(weighted_matrix, axis=0)
    # Calculate the Euclidean distances to the ideal and negative-ideal solutions
    dist_best = np.sqrt(np.sum((weighted_matrix - ideal_best)**2, axis=1))
    dist_worst = np.sqrt(np.sum((weighted_matrix - ideal_worst)**2, axis=1))

    # Calculate the topsis score
    topsis_scores = dist_worst / (dist_best + dist_worst)
    if np.any(topsis_scores >= 0.5):
        pass

    # Rank the alternatives based on relative closeness
    rankings = np.argsort(topsis_scores)
    return  rankings,topsis_scores

import socket
def udp():
    import socket

    msgFromClient = "Accident ahead please redirect"

    bytesToSend = str.encode(msgFromClient)

    serverAddressPort = ("192.168.102.205", 8080)

    bufferSize = 1024

    # Create a UDP socket at client side

    UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

    # Send to server using created UDP socket

    UDPClientSocket.sendto(bytesToSend, serverAddressPort)

    msgFromServer = UDPClientSocket.recvfrom(bufferSize)

    msg = "Message from Server {}".format(msgFromServer[0])

    print(msg)


# Main loop
class CustomEncoder:
    pass


try:
    # Read ultrasonic sensor distance from Arduino
    arduino.write(b'r')  # Send command to Arduino to request distance data
    ultrasonic_data = arduino.readline().decode().strip()
    ultrasonic_distance = float(ultrasonic_data.split(":")[1].split("cm")[0].strip())
    print("Distance:", ultrasonic_distance)

    # Read temperature sensor value from Arduino
    arduino.write(b't')  # Send command to Arduino to request temperature data
    temperature_data = arduino.readline().decode().strip()
    temperature = float(temperature_data.split(":")[1].split("C")[0].strip())
    print("Temperature:", temperature)

    # Update the Kalman filter
    x, P = update_kalman(ultrasonic_distance, temperature)



    # Calculate accident probability based on the measured distance
    accident_probability = calculate_accident_probability(x)
    print("Accident Probability:", accident_probability)

    if accident_probability >80:
        # Perform TOPSIS algorithm
        #csv_file= r"C:\Users\eljoy\Downloads\sensor_raw.csv"

        weights = np.array([0.75, 0.75, 0.75, 0.25, 0.25, 0.25, 0.90])  # Adjust the weights based on your preference
        # Read decision matrix from CSV file
        csv_file1 = r"C:\Users\eljoy\Downloads\sensor_raw.csv"
        rows = []
        with open(csv_file1, 'r') as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                rows.append(row)
        impact=np.array([1, 1, 1, 1, 1, 1, 1])
        # Convert the data to a NumPy array
        X = np.array(rows,dtype=float)
        ranks, topsis_scores = topsis(X, weights ,impact)
        print("TOPSIS Scores:", topsis_scores)
    else:
        exit(0)
    if np.any(topsis_scores >= 0.5):
        print("High Accident severity.....message redirecting to nearby vehicles")
        udp()
        # Push data to Firebase database
        data = {
            "Distance": ultrasonic_distance,
            "Temperature": temperature,
            "Position": position,
            "Velocity": velocity,
            "AccidentProbability": accident_probability,
            "Ranks": ranks.tolist(),
            "TOPSIS Scores": topsis_scores#.tolist()
        }
        print(data)
        print(type(data))
        JSONDecoder().decode(CustomEncoder().encode(data))
        database.child("sensor_data").set(data)

except KeyboardInterrupt:
    arduino.close()