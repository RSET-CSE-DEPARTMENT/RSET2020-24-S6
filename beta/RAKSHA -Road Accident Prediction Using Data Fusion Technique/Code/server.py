import socket
import threading
import winsound
import pyttsx3
import tkinter as tk

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Set the speech rate (lower value means slower speech)
speech_rate = 150
engine.setProperty('rate', speech_rate)

# Server IP address and port
SERVER_IP = socket.gethostname()  # Replace with your server IP address
SERVER_PORT = 8080  # Replace with an unused port number

# Create a UDP socket
server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s = (SERVER_IP, SERVER_PORT)

# Bind the socket to the server IP address and port
server_socket.bind(s)


def show_alert():
    alert_text = "Accident ahead. Please Reroute."
    # Create a pop-up window to display the alert message
    alert_window = tk.Toplevel(root)  # Use Toplevel() instead of Tk() for additional pop-up windows
    alert_window.title("Alert")

    # Increase the size of the pop-up window
    alert_window.geometry("400x200")  # Width: 400 pixels, Height: 200 pixels

    alert_label = tk.Label(alert_window, text="Accident ahead. Please Reroute.", font=("Impact", 18))
    alert_label.pack(pady=50)

    # Start the Tkinter event loop to display the pop-up window
    alert_window.after(1000, lambda: say_alert(alert_window, alert_text))  # Pass alert_window instance


def say_alert(alert_window, alert_text):
    # Call the function to say "Accident ahead. Please reroute."
    engine.say(alert_text)
    engine.runAndWait()

    # Destroy the pop-up window after voice alert and 2-second delay
    alert_window.after(1500, alert_window.destroy)


def receive_messages():
    while True:
        # Receive data from the client
        try:
            data, address = server_socket.recvfrom(1024)  # Buffer size is 1024 bytes
            data = data.decode()

            # Play the beep sound 5 times (500 milliseconds each)
            for _ in range(5):
                winsound.Beep(500, 500)  # 500 Hz frequency, 500 ms duration

            # Call the function to show the pop-up window
            show_alert()
        except KeyboardInterrupt:
            print('Server stopped.')
            break


# Start receiving messages in a separate thread
receive_thread = threading.Thread(target=receive_messages)
receive_thread.start()

# Create the main Tkinter window
root = tk.Tk()
root.withdraw()  # Hide the main window

print('UDP server listening on {}:{}'.format(SERVER_IP, SERVER_PORT))

# The server will keep running until manually terminated
root.mainloop()