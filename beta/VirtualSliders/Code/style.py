import tkinter as tk
# Define gamer aesthetic style
button_style = {
    "font": ("Arial", 20),
    "bg": "#fceb4a",  # Yellow color
    "fg": "black",
    "activebackground": "#fceb4a",  # Yellow color
    "activeforeground": "red",
    "bd": 2,  # Border width 
    "padx": 15,
    "pady": 10,
    "relief": tk.SOLID,  # Solid border style
    "borderwidth": 2,  # Border width 
}

home_button_style = {
    "font": ("Arial", 20),
    "bg": "#fceb4a",  # Yellow color
    "fg": "black",
    "activebackground": "#fceb4a",  # Yellow color
    "activeforeground": "red",
    "bd": 2,  # Border width 
    "padx": 10,  # Padding on the left and right
    "pady": 10,  # Padding on the top and bottom
    "relief": tk.SOLID,  # Solid border style
    "borderwidth": 2,  # Border width
    "compound": tk.LEFT,  # Place the image on the left side of the button
    "width": 100,  # Adjust the width as needed
    "height": 70  # Adjust the height as needed
}

qbutton_style = {
    "font": ("Arial", 20),
    "bg": "red",  # Yellow color
    "fg": "white", 
    "activeforeground": "red",
    "bd": 2,  # Border width
    "highlightthickness": 0,
    "padx": 15,
    "pady": 10,
    "relief": tk.SOLID,  # Solid border style
    "borderwidth": 2,  # Border width
    "highlightcolor": "red",  # Border color
    "highlightbackground": "red"  # Border color
}

textbox_style = {
    "font": ("Arial", 18),
    "bg": "#191919",  # Dark gray color
    "fg": "white",
    "insertbackground": "white",
    "bd": 0,
    "highlightthickness": 0,
    "width": 20
}

liveButton_style = {
                    "bg":"#88CDF6", 
                    "fg":"#002E63", 
                    "relief":tk.RAISED,
                    "font":("Helvetica", 12, "bold"), 
                    "padx":10, 
                    "pady":5
                    }

statusLabel_style = {
                    "bg":"#FCCB06", 
                    "fg":"black", 
                    "relief":tk.RAISED,
                    "font":("Helvetica", 12, "bold"), 
                    "padx":10, 
                    "pady":5
                    }