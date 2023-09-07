import cv2
import tkinter as tk
from tkinter import   messagebox,Toplevel
from PIL import ImageTk, Image
import threading
from style import *
import sqlite3
from classClient import classClient
from classServer import classServer
import os
# from broadcastingServer import client_list
# from broadcastingClient import server_list

# database connection
connection = sqlite3.connect('airhockey.db')
c = connection.cursor()

empty = ''
k = classClient(empty,empty)
s = classServer(empty,empty)

class GUI:
    def __init__(self):
        self.gui_server_name = ""
        self.gui_client_name = ""
        self.sampleNames = ["Joel", "Jonathan", "Sivaramakrishnan Subramaniam"]
        self.top_level = None
        self.playerName = None
        self.frame = None

        self.window = tk.Tk()
        self.window.attributes("-fullscreen", True)  # Set the window to fullscreen

        bg_image = Image.open("Resources/bgm.png")
        bg_image = bg_image.resize((self.window.winfo_screenwidth(), self.window.winfo_screenheight()))
        self.bg_photo = ImageTk.PhotoImage(bg_image)
        self.bg_label = tk.Label(self.window, image=self.bg_photo)
        self.bg_label.place(x=0, y=0, relwidth=1, relheight=1)

        self.start_button = None
        self.highscore_button = None
        self.quit_button = None
        self.clientMode = None
        self.serverMode = None
        self.back_button = None
        self.textbox1 = None 
        self.home_button=None

        self.go_home(1)
        #self.play_video()

        # Bind the Escape key to ask_quit function
        self.window.bind("<Escape>", lambda event: self.ask_quit())

        # Start the tkinter event loop
        self.window.mainloop()

    def create_widgets(self):  
        self.start_button = tk.Button(self.frame,    text="Start Game", command=self.start_game, **button_style)
        self.highscore_button = tk.Button(self.frame,text="  History  ", command=self.view_match_history, **button_style)
        self.quit_button = tk.Button(self.frame, text="Quit Game", command=self.ask_quit, **qbutton_style)
        self.clientMode = tk.Button(self.frame, text="Create Room", command=self.create_room, **button_style)
        self.serverMode = tk.Button(self.frame, text="Join Room", command=self.show_rooms, **button_style)
        home_image = Image.open("Resources/home.png")
        home_image = home_image.resize((45, 45))  # Adjust the size of the image if needed
        # Create a PhotoImage from the loaded image
        self.home_icon = ImageTk.PhotoImage(home_image)  # Store a reference to the PhotoImage
        # Create the home button
        self.back_button = tk.Button(self.window, image=self.home_icon, command=lambda mode=2: self.go_home(2),  **home_button_style)
        
        self.textbox1 = tk.Entry(self.frame, **textbox_style)
        self.textbox1.insert(tk.END, "Player 1")
        
    def position_widgets(self):
        self.start_button.place(relx=0.416, rely=0.49, anchor=tk.CENTER)
        self.highscore_button.place(relx=0.576, rely=0.49, anchor=tk.CENTER)
        self.quit_button.place(relx=0.501, rely=0.65, anchor=tk.CENTER)
        self.textbox1.place(relx=0.501, rely=0.65, anchor=tk.CENTER)
        self.clientMode.place(relx=0.416, rely=0.49, anchor=tk.CENTER)
        self.serverMode.place(relx=0.576, rely=0.49, anchor=tk.CENTER)
        self.back_button.place(relx=0.04, rely=0.052, anchor=tk.CENTER)

    def go_home(self,mode): 
        if mode==2:
            self.textbox1.destroy()
            self.clientMode.destroy()
            self.serverMode.destroy()
            self.back_button.destroy()
        
        self.create_widgets()
        self.position_widgets()
        
        self.textbox1.destroy()
        self.clientMode.destroy()
        self.serverMode.destroy()
        self.back_button.destroy()
        
    
    def start_game(self):
        
        self.start_button.destroy()
        self.highscore_button.destroy()
        self.quit_button.destroy()
 
        self.create_widgets()
        self.position_widgets()
        
        self.start_button.destroy()
        self.highscore_button.destroy()
        self.quit_button.destroy()


    def show_rooms(self): 
        thread = threading.Thread(target=k.client)
        thread.daemon = True  # Set the thread as daemon
        thread.start()
        status="Select a Room to join"
        demo_array = {}
        self.playerName = self.textbox1.get()# player name stored in this variable
        k.user_name = self.playerName
        roomWindow = tk.Toplevel(self.window)
        roomWindow.title("Available Rooms")
        roomWindow['background'] = "#222E50"
        roomWindow.geometry("550x400")
        buttons = []  # Initialize buttons list
        statusLabel = tk.Label(roomWindow, text=status,
                                       **statusLabel_style) 
        statusLabel.pack(fill=tk.X, padx=20, pady=5) 
        def buttonClick(btn_name):
            k.gui_server_name = btn_name
            statusLabel["text"]="Sending a request to "+btn_name+"..."
            statusLabel["fg"]="black"
            statusLabel["bg"]="#FCCB06"
            nonlocal status
            status=btn_name

        # Create and display the buttons
        count = 0

        def recButtons():
            nonlocal count
            nonlocal demo_array
            #sampleNames=self.sampleNames
            demo_array = k.server_names # server_list().copy()
            
            if count > 0:
                for widget in roomWindow.winfo_children():
                    if widget!=statusLabel:
                        widget.destroy()  # Destroy all widgets before re-creating them 
                self.sampleNames=["NoobGamer69","Joel"]
            if len(demo_array) == 0:
                noRoomsLabel = tk.Label(roomWindow, text="No Rooms Currently Online", bg="#E6F2FF", font=("Helvetica", 14))
                noRoomsLabel.pack(pady=50)
            else: 
                for name in demo_array:
                    button = tk.Button(roomWindow, text=name, 
                                       command=lambda btn_name=name: buttonClick(btn_name),
                                       **liveButton_style)
                    button.pack(fill=tk.X, padx=20, pady=5)
                    buttons.append(button)
                if status!="Select a Room to join" and status not in demo_array:
                    statusLabel["text"]=status+" went offline. Try again"
                    statusLabel["fg"]="white"
                    statusLabel["bg"]="red"
            count += 1
            roomWindow.after(2000, recButtons)

        recButtons()

    def create_room(self):
        thread = threading.Thread(target=s.server)
        thread.daemon = True  # Set the thread as daemon
        thread.start()
        status="Select a Player to accept"
        demo_array = {}
        self.playerName = self.textbox1.get()  # player name stored in this variable
        s.user_name = self.playerName
        roomWindow = tk.Toplevel(self.window)
        roomWindow.title("Incoming Requests")
        roomWindow['background'] = "#222E50"
        roomWindow.geometry("550x400")
        buttons = []  # Initialize buttons list
        statusLabel = tk.Label(roomWindow, text=status,
                                       **statusLabel_style) 
        statusLabel.pack(fill=tk.X, padx=20, pady=5) 
        def buttonClick(btn_name):
            s.gui_client_name= btn_name
            statusLabel["text"]="Accepting "+btn_name+"..."
            statusLabel["fg"]="black"
            statusLabel["bg"]="#FCCB06"
            nonlocal status
            status=btn_name

        # Create and display the buttons
        count = 0

        def recButtons():
            nonlocal count
            nonlocal demo_array
            
            #sampleNames=self.sampleNames
            demo_array = s.client_names # server_list().copy()
            
            if count > 0:
                for widget in roomWindow.winfo_children():
                    if widget!=statusLabel:
                        widget.destroy()  # Destroy all widgets before re-creating them  
            if len(demo_array) == 0:
                noRoomsLabel = tk.Label(roomWindow, text="Waiting for Requests...", bg="#E6F2FF", font=("Helvetica", 14))
                noRoomsLabel.pack(pady=50)
            else:
                for name in demo_array:
                    button = tk.Button(roomWindow, text=name, 
                                       command=lambda btn_name=name: buttonClick(btn_name),**liveButton_style)
                    button.pack(fill=tk.X, padx=20, pady=5)
                    buttons.append(button)
                if status!="Select a Player to accept" and status not in demo_array:
                    statusLabel["text"]=status+" went offline. Try again"
                    statusLabel["fg"]="white"
                    statusLabel["bg"]="red"
            count += 1
            roomWindow.after(2000, recButtons)

        recButtons()

    def open_settings(self):
        pass

    def view_match_history(self):
        c.execute('SELECT * FROM scoreset ORDER BY rowid DESC LIMIT 7')
        rows = c.fetchall()
        highscore_window = Toplevel(self.window)

        highscore_window.title("Match History")
        highscore_window.geometry("430x460")
        highscore_window.configure(bg="#002E63")  # Set background color of the window

        for row in rows:
            frame = tk.Frame(highscore_window, bg="#D4E6F1", padx=10, pady=10)
            time_label = tk.Label(frame, text=str(row[4]), fg="#3498DB", bg="#D4E6F1",
                                  font=("Helvetica", 12, "bold"))
            score_label = tk.Label(frame, text=str(row[2])+" - "+str(row[3]), **statusLabel_style)
            player1_label = tk.Label(frame, text=str(row[0]), fg="red", bg="#D4E6F1",
                                     font=("Helvetica", 12,"bold"))
            vs_label = tk.Label(frame, text= " VS ", fg="#2ECC71", bg="#D4E6F1",
                                     font=("Helvetica", 12,"bold"))
            player2_label = tk.Label(frame, text= str(row[1]), fg="blue", bg="#D4E6F1",
                                     font=("Helvetica", 12,"bold"))
            frame.pack(fill=tk.X, padx=10, pady=5)
            time_label.pack(side=tk.LEFT)
            score_label.pack(side=tk.LEFT, padx=10)
            player1_label.pack(side=tk.LEFT)
            vs_label.pack(side=tk.LEFT)
            player2_label.pack(side=tk.LEFT)

    def play_video(self):
        ret, frame = self.cap.read()
        if ret:
            # Retrieve screen resolution
            screen_width = self.window.winfo_screenwidth()
            screen_height = self.window.winfo_screenheight()

            # Resize video frame to match screen resolution
            frame = cv2.resize(frame, (screen_width, screen_height))
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image = ImageTk.PhotoImage(Image.fromarray(frame))
            self.canvas.create_image(0, 0, anchor=tk.NW, image=image)
            self.canvas.image = image
            self.window.after(30, self.play_video)
        else:
            self.cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            self.play_video()

    def ask_quit(self):
        if messagebox.askokcancel("Quit", "Are you sure you want to quit?"):
            self.window.destroy()

gui = GUI()