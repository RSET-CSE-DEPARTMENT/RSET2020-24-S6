import cv2
import numpy as np
from PIL import ImageFont, ImageDraw, Image
import tkinter.font as tkFont
import tkinter.messagebox as messagebox

# Custom color palette
BG_COLOR = (242, 242, 242)
BUTTON_COLOR = (35, 150, 243)
BUTTON_TEXT_COLOR = (255, 255, 255)

class LoginPage:
    def __init__(self, master):
        self.master = master
        self.create_widgets()

    def create_widgets(self):
        # Create and configure fonts
        title_font = ImageFont.truetype("Arial", 18, bold=True)
        label_font = ImageFont.truetype("Arial", 12)
        entry_font = ImageFont.truetype("Arial", 12)
        button_font = ImageFont.truetype("Arial", 12, bold=True)

        # Create a blank image to display the GUI
        image = Image.new("RGB", (400, 300), BG_COLOR)
        draw = ImageDraw.Draw(image)

        # Title label
        draw.text((200, 30), "Login Page", font=title_font, fill=0, anchor="ms")

        # Email label and entry
        draw.text((120, 90), "Email:", font=label_font, fill=0)
        draw.rectangle([(180, 88), (370, 112)], fill=BG_COLOR, outline=0)
        self.email_entry = Entry((180, 88, 370, 112), font=entry_font)

        # Password label and entry
        draw.text((120, 140), "Password:", font=label_font, fill=0)
        draw.rectangle([(180, 138), (370, 162)], fill=BG_COLOR, outline=0)
        self.password_entry = Entry((180, 138, 370, 162), show="*", font=entry_font)

        # Login button
        draw.rectangle([(160, 200), (240, 230)], fill=BUTTON_COLOR, outline=0)
        draw.text((200, 215), "Login", font=button_font, fill=BUTTON_TEXT_COLOR, anchor="ms")
        self.login_button = Button((160, 200, 240, 230), self.login)

        # Register button
        draw.rectangle([(260, 200), (340, 230)], fill=BUTTON_COLOR, outline=0)
        draw.text((300, 215), "Register", font=button_font, fill=BUTTON_TEXT_COLOR, anchor="ms")
        self.register_button = Button((260, 200, 340, 230), self.register)

        # Display the image using OpenCV
        cv2.imshow("Rock Paper Scissors", np.array(image))
        cv2.waitKey(0)

    def login(self):
        email = self.email_entry.get()
        password = self.password_entry.get()

        # Perform login validation
        # Replace this with your own logic
        if email == "test@example.com" and password == "password":
            self.master.login_success()
        else:
            messagebox.showerror("Login Failed", "Invalid email or password.")

    def register(self):
        # Implement registration logic here
        # Replace this with your own logic
        messagebox.showinfo("Register", "Registration feature is not implemented yet.")

class GameMenu:
    def __init__(self, master):
        self.master = master
        self.create_widgets()

    def create_widgets(self):
        # Create and configure fonts
        title_font = ImageFont.truetype("Arial", 18, bold=True)
        button_font = ImageFont.truetype("Arial", 12, bold=True)

        # Create a blank image to display the GUI
        image = Image.new("RGB", (300, 200), BG_COLOR)
        draw = ImageDraw.Draw(image)

        # Title label
        draw.text((150, 30), "Game Menu", font=title_font, fill=0, anchor="ms")

        # Play button
        draw.rectangle([(100, 80), (200, 110)], fill=BUTTON_COLOR, outline=0)
        draw.text((150, 95), "Play", font=button_font, fill=BUTTON_TEXT_COLOR, anchor="ms")
        self.play_button = Button((100, 80, 200, 110), self.play_game)

        # High Scores button
        draw.rectangle([(100, 130), (200, 160)], fill=BUTTON_COLOR, outline=0)
        draw.text((150, 145), "High Scores", font=button_font, fill=BUTTON_TEXT_COLOR, anchor="ms")
        self.high_scores_button = Button((100, 130, 200, 160), self.show_high_scores)

        # Display the image using OpenCV
        cv2.imshow("Game Menu", np.array(image))
        cv2.waitKey(0)

    def play_game(self):
        messagebox.showinfo("Play Game", "Starting the game...")

    def show_high_scores(self):
        messagebox.showinfo("High Scores", "Showing high scores...")

class App:
    def __init__(self):
        self.login_page = LoginPage(self)
        self.game_menu = None

    def login_success(self):
        self.login_page = None
        self.game_menu = GameMenu(self)

    def run(self):
        cv2.destroyAllWindows()

if __name__ == "__main__":
    app = App()
    app.login_page.create_widgets()
    app.run()
