import _thread
import concurrent.futures
import multiprocessing
import threading
import tkinter
from threading import Thread
import numpy as np
import PIL
import customtkinter
import tkinter as tk

from CTkTable import CTkTable

import RTO
from pyrebase import pyrebase
import tkinter.messagebox
import reg_fun
import ray
import main
import imageio
from PIL import ImageTk
from PIL import Image


config = {
    "apiKey": "AIzaSyCQ2jsvICouZs7m7TA27a2u0MIRiLEKFZE",
    "authDomain": "aods-668cc.firebaseapp.com",
    "database": "https://aods-668cc-default-rtdb.firebaseio.com",
    "projectId": "aods-668cc",
    "storageBucket": "aods-668cc.appspot.com",
    "messagingSenderId": "34841860662",
    "appId": "1:34841860662:web:bcfce82f0319dd1208d697",
    "measurementId": "G-SNMQQ84LS2",
    "databaseURL": "https://aods-668cc-default-rtdb.firebaseio.com",
    "serviceAccount": "aods-668cc-firebase-adminsdk-r20v3-238f70f53a.json"
}

try:
    firebase = pyrebase.initialize_app(config)
    database = firebase.database()
    s1 = database.child("Users").get()
except Exception as e:
    print(e)


# def start1(self):
#     # Define the target function for the new thread
#     thr=threading.Thread(target=self.sidebar_button_event1)
#     # new_thread = Thread(target=thread_task)
#     # new_thread.start()
class App(customtkinter.CTk):
    def __init__(self):
        super().__init__()
        self.tab = None
        self.table = None
        self.stop_flag = threading.Event()
        self.value = [["SL.No", "Registration Number", "Picture"]]
        customtkinter.set_default_color_theme("blue")
        # configure window
        video_path = "video1.mp4"
        self.title("AODS-MVD")
        wid = self.winfo_screenwidth()
        hei = self.winfo_screenheight()
        self.geometry("{}x{}+0+0".format(wid, hei))
        self.state('zoomed')
        self.resizable(0,1)
        # self.attributes('-fullscreen',True)
        # configure grid layout (4x4)
        self.grid_columnconfigure(1, weight=1)
        self.grid_columnconfigure((2, 3), weight=0)
        self.grid_rowconfigure((0, 1, 2), weight=1)
        # create canvas
        # self.canvas = tk.Canvas(self, bg="white")
        # self.canvas.grid(row=0, column=1, padx=(20, 0), pady=(20, 0), sticky="nsew")
        # self.canvas.grid_columnconfigure(0, weight=1)
        # self.canvas.grid_rowconfigure(0, weight=1)
        # create sidebar frame with widgets
        self.sidebar_frame = customtkinter.CTkFrame(self, width=180, height=hei, corner_radius=0)
        self.sidebar_frame.grid(row=0, column=0, sticky='nsew')
        self.sidebar_frame.grid_rowconfigure(4, weight=1)
        self.logo_label = customtkinter.CTkLabel(self.sidebar_frame, text="AODS",
                                                 font=customtkinter.CTkFont(size=20, weight="bold"))
        self.logo_label.grid(row=0, column=0, padx=20, pady=(20, 10))
        self.sidebar_button_1 = customtkinter.CTkButton(self.sidebar_frame, text="Live Cam",
                                                        command=self.disable_but, width=200, height=25,
                                                        font=customtkinter.CTkFont(size=17))
        self.sidebar_button_1.grid(row=1, column=0, padx=20, pady=10)
        self.sidebar_button_2 = customtkinter.CTkButton(self.sidebar_frame, text="New User",
                                                        command=self.sidebar_button_event, width=200, height=25,
                                                        font=customtkinter.CTkFont(size=17))
        self.sidebar_button_2.grid(row=2, column=0, padx=20, pady=10)
        self.sidebar_button_3 = customtkinter.CTkButton(self.sidebar_frame, text="Violators",
                                                        command=self.thread1, width=200,
                                                        height=25,
                                                        font=customtkinter.CTkFont(size=17))
        self.sidebar_button_3.grid(row=3, column=0, padx=20, pady=10)
        self.string_input_button = customtkinter.CTkButton(self.sidebar_frame, text="No. of Violations", width=200,
                                                           height=25,
                                                           font=customtkinter.CTkFont(size=17),
                                                           command=self.open_input_dialog_event)
        self.string_input_button.grid(row=4, column=0, padx=20, pady=10)
        self.string_input_button.place(x=20, y=210)
        self.appearance_mode_label = customtkinter.CTkLabel(self.sidebar_frame, text="Appearance Mode:", anchor="w",
                                                            font=customtkinter.CTkFont(weight="bold"))
        self.appearance_mode_label.grid(row=5, column=0, padx=20, pady=(10, 0))
        self.appearance_mode_optionmenu = customtkinter.CTkOptionMenu(self.sidebar_frame,
                                                                      values=["Dark", "Light", "System"],
                                                                      command=self.change_appearance_mode_event,
                                                                      width=150)
        self.appearance_mode_optionmenu.grid(row=6, column=0, padx=20, pady=(10, 10))
        self.scaling_label = customtkinter.CTkLabel(self.sidebar_frame, text="Scaling:", anchor="w",
                                                    font=customtkinter.CTkFont(weight="bold"))
        self.scaling_label.grid(row=7, column=0, padx=20, pady=(10, 0))
        self.scaling_optionmenu = customtkinter.CTkOptionMenu(self.sidebar_frame,
                                                              values=["100%", "90%", "80%", "110%", "120%"],
                                                              command=self.change_scaling_event, width=150)
        self.scaling_optionmenu.grid(row=8, column=0, padx=20, pady=(10, 20))
        self.appearance_mode_optionmenu.set("Dark")
        self.scaling_optionmenu.set("100%")
        # create slider_progressbar frame
        self.slider_progressbar_frame = customtkinter.CTkFrame(self, width=100)
        self.slider_progressbar_frame.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
        self.slider_progressbar_frame.grid(row=0, column=1, padx=(20, 0), pady=(20, 0), sticky="nsew")
        self.slider_progressbar_frame.grid_columnconfigure(0, weight=1)
        self.slider_progressbar_frame.grid_rowconfigure(4, weight=1)
        # self.textbox = customtkinter.CTkTextbox(self.slider_progressbar_frame, width=250)
        # self.textbox.grid(row=2, column=0, padx=(10, 0), pady=(20, 0), sticky="nsew")
        self.progressbar_1 = customtkinter.CTkProgressBar(self.slider_progressbar_frame, width=1200)
        self.progressbar_1.grid(row=1, column=0, padx=(10, 10), pady=(5, 10), sticky="ew")
        self.progressbar_1.configure(mode="indeterminate")
        self.progressbar_1.start()
        self.progressbar_2 = customtkinter.CTkProgressBar(self.slider_progressbar_frame, width=1200)
        self.progressbar_2.grid(row=3, column=0, padx=(10, 10), pady=(730, 10), sticky="ew")
        self.progressbar_2.configure(mode="indeterminate")
        self.progressbar_2.start()
        self.canvas1 = tk.Canvas(self, width=800, height=800, bg='#2B2B2B')
        self.canvas1.grid(row=0, column=1, padx=(35, 12), pady=(50, 30), sticky="nesw")
        self.canvas1.grid_columnconfigure(0, weight=1)
        self.canvas1.grid_rowconfigure(0, weight=1)
        self.sidebar_frame.grid_rowconfigure(4, weight=1)
        self.video_path = "video1.mp4"
        self.video = imageio.get_reader(self.video_path)
        self.current_frame = None
        # self.user.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
        # tk.Misc.lift(self.canvas1)
        # tk.Misc.lift(self.sidebar_frame)
        self.slider_progressbar_frame.rowconfigure(0, weight=1)
        self.slider_progressbar_frame.columnconfigure(0, weight=1)
        self.l1 = None
        self.t1 = None
        self.img = None
        self.s = None
        self.tk1 = None
        self.flag = 0
        self.flag1 = 0
        self.check_something()
    def thread1(self):
        threading.Thread(target=self.start1).start()
        self.sidebar_button_3.configure(state='disabled')
        self.sidebar_button_2.configure(state="disabled")
        self.sidebar_button_1.configure(state="disabled")
    def check_something(self):
        print("check0: " + threading.current_thread().getName())
        for thread in threading.enumerate():
            print(f"Thread name: {thread.name}")
        if self.flag == 1:
            self.sidebar_button_event1()
        self.after(1000, self.check_something)

    def disable_but(self):
        self.sidebar_button_1.configure(state="disabled")
        self.sidebar_button_3.configure(state='normal')
        if self.t1 is not None:
            self.t1.destroy()
            self.t1 = None
        if self.l1 is not None:
            if self.l1.winfo_exists():
                self.l1.destroy()
                self.l1 = None
        if self.current_frame is None:
            self.update_frame()

    def play_video(self):
        self.canvas1.delete()
        for frame in self.video.iter_data():
            image = Image.fromarray(frame)
            self.current_frame = ImageTk.PhotoImage(image)
            self.canvas1.create_image(0, 0, image=self.current_frame, anchor=tkinter.NW)
            self.canvas1.place(relx=0.5, rely=0.5, anchor=tk.CENTER)
            # self.canvas1.update()

    def update_frame(self):
        if self.current_frame is not None:
            self.canvas1.delete(self.current_frame)

        try:
            frame = self.video.get_next_data()
            image = Image.fromarray(frame)
            self.current_frame = ImageTk.PhotoImage(image)
            self.canvas1.create_image(0, 0, image=self.current_frame, anchor=tkinter.NW)
        except imageio.core.format.CannotReadFrameError:
            return

        self.after(50, self.update_frame)
    def open_input_dialog_event(self):
        dialog = customtkinter.CTkInputDialog(text="Registration Number:", title="Violations")
        no = dialog.get_input()
        n = RTO.rto(no, database)
        print(n)
        if n is None:
            tkinter.messagebox.showinfo("AODS", "No History Of Violations Found")
        else:
            tkinter.messagebox.showinfo("AODS",
                                        "The vehicle registered " + no + " has violated the rules " + n + " times")
    def change_appearance_mode_event(self, new_appearance_mode: str):
        customtkinter.set_appearance_mode(new_appearance_mode)

    def change_scaling_event(self, new_scaling: str):
        new_scaling_float = int(new_scaling.replace("%", "")) / 100
        customtkinter.set_widget_scaling(new_scaling_float)
    def new_user(self, user, user1, user2, email, mobile, passw, passc):
        print("clicg")
        u = user.get()
        u1 = user1.get()
        u2 = user2.get()
        e = email.get()
        m = mobile.get()
        p = passw.get()
        pc = passc.get()
        t = reg_fun.reg_func(u, u1, u2, e, m, p, pc, database)
        if t:
            self.l1.destroy()
            self.l1 = None
    def loading(self):
        print("loading: " + threading.current_thread().getName())
        tk1 = customtkinter.CTk()
        tk1.title("Collecting Information")
        tk1.eval('tk::PlaceWindow . center')
        tk1.geometry("320x75")
        labl=customtkinter.CTkLabel(tk1,text="Please Wait...\nDo not close this window...")
        labl.grid(row=0,column=0)
        prog = customtkinter.CTkProgressBar(tk1, width=300)
        prog.grid(row=1, column=0, padx=(10, 10), pady=(5, 10), sticky="ew")
        prog.configure(mode="indeterminate")
        prog.start()
        def stop():
            tk1.destroy()
        def check_something1():
            # print(threading.current_thread().getName())
            x=-1
            print("checksomething1: " + threading.current_thread().getName())
            if self.flag1 == 1:
                self.flag1 = 0
                x = 0
                print(self.flag1)
                # self.tk1.destroy()
                stop()
                self.sidebar_button_2.configure(state="normal")
                self.sidebar_button_1.configure(state="normal")
                for thread in threading.enumerate():
                    print(f"Thread name: {thread.name}")
            elif x==-1:
                tk1.after(1000, check_something1)
        check_something1()
        tk1.mainloop()
    # def check_something1(self):
    #     # print(threading.current_thread().getName())
    #     if self.flag1 == 1:
    #         self.flag1 = 0
    #         x=0
    #         print(self.flag1)
    #
    #         self.tk1.destroy()
    #     elif self.flag1==0:
    #         self.after(1000, self.check_something1)
    def start1(self):
        print("start1: "+threading.current_thread().getName())
        def start():
            # Define the target function for the new thread
            print("start: " + threading.current_thread().getName())
            self.flag = 0
            print("hi")
            self.s = database.child("Violators").get()
            print(len(self.s.each()))
            k = 1
            self.value = [["SL.No", "Registration Number", "Picture"]]
            self.img = []
            for j in range(1,len(self.s.each())):
                print(j)
                num=database.child("Plate").child(j).get()
                self.value.append([j, num.val(), 'h'])
                print(self.value)
                k = k + 1
            for j in range(1,len(self.s.each())):
                emily = database.child("Violators").child(j).child("Pic").get()
                a = []
                for i in emily.each():
                    # print(i.val())
                    a.append(i.val())
                img = PIL.Image.fromarray(np.uint8(a))
                img = img.resize((300,268))
                img1 = ImageTk.PhotoImage(img)
                self.img.append(img1)
            self.flag = 1
        # thr0=threading.Thread(target=self.check_something1())
        # thr0.start()
        #
        thr1 = threading.Thread(target=start)
        thr1.start()
        thr = threading.Thread(target=self.loading)
        thr.start()
        for thread in threading.enumerate():
            print(f"Thread name: {thread.name}")
        return
    def sidebar_button_event1(self):
        self.flag = 0
        # _thread.start_new_thread(trial.table,(self.canvas1,))
        # trial.table(self.canvas1)
        self.sidebar_button_1.configure(state="normal")
        if self.l1 is not None:
            if self.l1.winfo_exists():
                self.l1.destroy()
                self.l1 = None
        if self.t1 is None:
            # start1()
            # _thread.start_new_thread(start1, ())
            self.t1 = customtkinter.CTkLabel(master=self.canvas1, text="")
            self.t1.pack()
            self.tab = customtkinter.CTkScrollableFrame(master=self.t1, width=1500, height=800)
            self.tab.grid(row=0, column=0)
            self.table = CTkTable(master=self.tab, column=3, values=self.value)
            # table.grid(sticky="nsew")
            self.tab.grid_rowconfigure(0, weight=1)
            self.tab.grid_columnconfigure(0, weight=1)
            self.table.pack(expand=True, fill="both", padx=20, pady=20)
            labels = {}
            try:
                self.table.configure(values=self.value)
            except Exception as e:
                print(e)
            k = 1
            j = 0
            # s = database.child("Violators").get()
            # table.configure(values=v)
            print("for")
            for i in range(len(self.s.each())-1):
                print(i)
                # emily = database.child("Violators").child(j).child("Pic").get()
                # a = []
                # for i in emily.each():
                #     # print(i.val())
                #     a.append(i.val())
                # img = PIL.Image.fromarray(np.uint8(a))
                # img1 = ImageTk.PhotoImage(img)
                p = f"Label {i + 1}"
                if k % 2 == 0:
                    fg = "#242424"
                else:
                    fg = "#333333"
                img1 = self.img[i]
                lab = customtkinter.CTkLabel(master=self.table, text="", image=img1, width=300, height=300,
                                             fg_color=fg)
                lab.grid(row=k, column=2, sticky='nsew')
                k = k + 1
                lab.lift()
                labels[p] = lab
            # threads=[]
            for thread in threading.enumerate():
                print(f"Thread name: {thread.name}")
            #     threads.append(thread)
            # for thread in threads:
            #     if thread != threading.current_thread():
            #         thread.join()
            self.flag1=1
    def sidebar_button_event(self):
        print("sidebar_button click")
        if self.t1 is not None:
            if self.t1.winfo_exists():
                self.t1.destroy()
                self.t1 = None
        if self.l1 is not None:
            if self.l1.winfo_exists():
                print("")
        else:
            self.sidebar_button_3.configure(state='normal')
            self.sidebar_button_1.configure(state="normal")
            img1 = ImageTk.PhotoImage(Image.open(r".\images\pattern.png"))
            self.l1 = customtkinter.CTkLabel(master=self.canvas1, image=img1, text="")
            self.l1.pack()
            self.user = customtkinter.CTkFrame(master=self.l1, width=320, height=400, corner_radius=6)
            self.user.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)
            l2 = customtkinter.CTkLabel(master=self.user, text="Sign In AODS", text_color='green',
                                        font=('Century Gothic', 20))
            l2.place(x=50, y=20)
            # self.user.grid()
            # self.frame_id = self.l1.create_window(0, 0, anchor=tk.NW, window=self.user)
            # self.user.grid(sticky=tk.NSEW)
            self.entry0 = customtkinter.CTkEntry(master=self.user, width=220, height=30, placeholder_text='Name')
            self.entry0.place(x=50, y=68)
            self.entry1 = customtkinter.CTkEntry(master=self.user, width=111, height=30,
                                                 placeholder_text='M.Name(can skip)')
            self.entry1.place(x=50, y=100)
            self.entry01 = customtkinter.CTkEntry(master=self.user, width=108, height=30, placeholder_text='Last Name')
            self.entry01.place(x=162, y=100)
            self.entry2 = customtkinter.CTkEntry(master=self.user, width=220, height=30, placeholder_text='Email')
            self.entry2.place(x=50, y=150)
            self.entry3 = customtkinter.CTkEntry(master=self.user, width=220, height=30,
                                                 placeholder_text='Mobile Number')
            self.entry3.place(x=50, y=200)
            self.entry4 = customtkinter.CTkEntry(master=self.user, width=220, height=30, placeholder_text='Password',
                                                 show='*')
            self.entry4.place(x=50, y=250)
            self.entry5 = customtkinter.CTkEntry(master=self.user, width=220, height=30,
                                                 placeholder_text='Confirm Password', show='*')
            self.entry5.place(x=50, y=300)
            self.firstName_icon = ImageTk.PhotoImage(Image.open(r".\images\user1.png"))
            firstName_icon_Label = customtkinter.CTkLabel(master=self.user, text="", image=self.firstName_icon,
                                                          fg_color="#2B2B2B")
            firstName_icon_Label.place(x=22, y=80)
            self.email_icon = ImageTk.PhotoImage(Image.open(r".\images\emailicon1.png"))
            emain_Label = customtkinter.CTkLabel(master=self.user, text="", image=self.email_icon,
                                                 fg_color="#2B2B2B")
            emain_Label.place(x=22, y=150)
            self.phone_icon = ImageTk.PhotoImage(Image.open(r".\images\phoneicon1.png"))
            phone_Label = customtkinter.CTkLabel(master=self.user, text="", image=self.phone_icon,
                                                 fg_color="#2B2B2B")
            phone_Label.place(x=22, y=200)
            self.pass_icon = ImageTk.PhotoImage(Image.open(r".\images\passicon1.png"))
            phone_Label = customtkinter.CTkLabel(master=self.user, text="", image=self.pass_icon,
                                                 fg_color="#2B2B2B")
            phone_Label.place(x=22, y=250)
            self.pass_icon2 = ImageTk.PhotoImage(Image.open(r".\images\passicon2.png"))
            phone_Label2 = customtkinter.CTkLabel(master=self.user, text="", image=self.pass_icon2,
                                                  fg_color="#2B2B2B")
            phone_Label2.place(x=22, y=300)

            self.button1 = customtkinter.CTkButton(master=self.user, width=220, text="Login",
                                                   command=lambda: self.new_user(self.entry0, self.entry1, self.entry01,
                                                                                 self.entry2, self.entry3, self.entry4,
                                                                                 self.entry5),
                                                   corner_radius=6)
            self.button1.place(x=50, y=350)

def func4():
    app = App()
    app.mainloop()
def func3():
    ray.init()
    # Define functions you want to execute in parallel using
    # the ray.remote decorator.
    @ray.remote
    def func1():
        app = App()
        app.mainloop()
    @ray.remote
    def func2():
        main.main()
# Execute func1 and func2 in parallel.
    ray.get([func1.remote(), func2.remote()])