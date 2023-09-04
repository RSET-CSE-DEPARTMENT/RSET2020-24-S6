import mysql.connector as mcon
from tkinter import *
from tkinter import ttk
import tkinter.messagebox
from PIL import Image, ImageTk

con = mcon.connect(host="localhost", user="root", password="Fariz@2002")
c = con.cursor()
c.execute("use ges")

class Table:
    def __init__(self, root, total_rows, total_columns, lst):
        v = Scrollbar(root, orient=VERTICAL)
        v.pack(side=RIGHT, fill=Y)
        
        view2 = Frame(root, bg='#2B65EC', width=1920, height=500)
        view2.pack(side=LEFT, fill=Y)
        
        # code for creating table
        for i in range(total_rows):
            for j in range(total_columns):
                self.e = Label(view2, width=20, fg='black', text=str(lst[i][j]),
                               font=('Arial', 16, 'bold'), relief=SOLID, borderwidth=2)
                self.e.grid(row=i, column=j)

def view_all_details():
    global view, main, image
    main.destroy()
    view = Frame(root, bg='#2B65EC', width=1920, height=1080)
    view.pack()
    image = Image.open("gtov.png")
    image = image.resize((1920, 1080), Image.ANTIALIAS)
    image = ImageTk.PhotoImage(image)
    background_label = Label(view, image=image)
    background_label.image = image
    background_label.pack(fill="both", expand=True)
    label1 = Label(view, text='All requests', font=('semi bold', 40, 'normal'), bg='#2B65EC')
    label1.place(x=700, y=128)
    view1 = Frame(root, bg='#2B65EC', width=1920, height=500)
    view1.place(x=100, y=250)
    back = Button(view, text='BACK', width=5, font=('semi bold', 14, 'normal'), command=main_area)
    back["highlightthickness"] = 5
    back.place(x=25, y=25)
    c.execute("select * from gesture")
    lst = c.fetchall()
    total_rows = len(lst)
    total_columns = len(lst[0])
    Table(view1, total_rows, total_columns, lst)

def search():
    global view, main, image
    main.destroy()
    view = Frame(root, bg='#2B65EC', width=1920, height=1080)
    view.pack()
    image = PhotoImage(file="gtov.png")
    background_label = Label(view, image=image)
    background_label.pack(fill="both", expand=True)
    label1 = Label(view, text='SEARCH', font=('semi bold', 40, 'normal'))
    label1.place(x=700, y=128)
    e1 = Entry(view, width=15, font=('semi bold', 18, 'normal'))
    e1.insert(0, "from: yyyy-mm-dd")
    e1.place(x=700, y=228)
    e2 = Entry(view, width=15, font=('semi bold', 18, 'normal'))
    e2.insert(0, "to: yyyy-mm-dd")
    e2.place(x=700, y=328)
    view1 = Frame(root, bg='#2B65EC', width=600, height=500)
    view1.place(x=30, y=180)
    back = Button(view, text='BACK', width=20, font=('semi bold', 20, 'normal'), command=main_area)
    back.place(x=100, y=100)
    
    def find():
     c.execute("SELECT * FROM gesture WHERE tim > %s AND tim < %s", (e1.get(), e2.get()))
     lst = c.fetchall()
     total_rows = len(lst)
     total_columns = len(lst[0]) 

     Table(view1, total_rows, total_columns, lst)
        
     
    
    b1 = Button(view, text='SEARCH', width=20, font=('semi bold', 20, 'normal'), command=find)
    b1.place(x=700, y=400)


def run():
    import project1 as p
    p.main()

def Hp():
    global view, main, image
    main.destroy()
    view = Frame(root, bg='#2B65EC', width=1920, height=1080)
    view.pack()
    image = Image.open("help.png")
    image = image.resize((1220, 799), Image.ANTIALIAS)
    image = ImageTk.PhotoImage(image)
    background_label = Label(view, image=image)
    background_label.image = image
    background_label.pack(fill="both", expand=True)
    back = Button(view, text='BACK', width=5, font=('semi bold', 14, 'normal'), command=main_area)
    back["highlightthickness"] = 5
    back.place(x=25, y=25)
def main_area():
    global main, view, image
    view.destroy()
    main = Frame(root, bg='#2B65EC', width=1920, height=1080)
    main.pack()
    image = Image.open("gtov.png")
    image = image.resize((1920, 1080), Image.ANTIALIAS)
    image = ImageTk.PhotoImage(image)
    background_label = Label(main, image=image)
    background_label.image = image
    background_label.pack(fill="both", expand=True)
    b1 = Button(main, text='VIEW ALL DETAILS', width=20, font=('semi bold', 20, 'normal'), command=view_all_details)
    b1.place(x=700, y=128)
    b2 = Button(main, text='SEARCH', width=20, font=('semi bold', 20, 'normal'), command=search)
    b2.place(x=700, y=228)
    b3 = Button(main, text='Execute', width=20, font=('semi bold', 20, 'normal'), command=run)
    b3.place(x=700, y=328)
    b4 = Button(main, text='Help', width=20, font=('semi bold', 20, 'normal'), command=Hp)
    b4.place(x=700, y=428)
    b5 = Button(main, text='logout', width=20, font=('semi bold', 20, 'normal'), command=log)
    b5.place(x=700, y=528)

def logincheck():
    global pid, user_name
    user_name = l1.get()
    password = l2.get()
    c.execute("select * from user where name='"+user_name+"'and password='"+password+"'")
    d = c.fetchall()
    pid = d[0][0]
    if len(d) != 0:
        print('login successful')
        login.destroy()
        main_area()
    else:
        tkinter.messagebox.showinfo("ERROR", "Incorrect credentials")
        print('login unsuccessful')

root = Tk()
root.geometry("1920x1080")
root.title("gesture to voice activation")
view = Frame(root, bg='#2B65EC', width=1920, height=1080)
main = Frame(root, bg='#2B65EC', width=1920, height=1080)

def log():
    global view, login, image,main,l1,l2
    main.destroy()
    view.destroy()
    login = Frame(root, bg='#2B65EC', width=1920, height=1080)
    login.pack()
    image = Image.open("gtov.png")
    image = image.resize((1920, 1080), Image.ANTIALIAS)
    image = ImageTk.PhotoImage(image)
    background_label = Label(login, image=image)
    background_label.image = image
    background_label.pack(fill="both", expand=True)
    view = Frame(root, bg='#2B65EC', width=1920, height=1080)
    l1 = Entry(login, width=15, font=('semi bold', 40, 'normal'))
    l1.place(x=750, y=228)
    l2 = Entry(login, width=15, show="*", font=('semi bold', 40, 'normal'))
    l2.place(x=750, y=328)
    label1 = Label(login, text='LOGIN', font=('semi bold', 40, 'normal'))
    label1.place(x=900, y=128)
    label1 = Label(login, text='USER NAME:', font=('semi bold', 40, 'normal'), bg='#2B65EC')
    label1.place(x=400, y=228)
    label1 = Label(login, text='PASSWORD:', font=('semi bold', 40, 'normal'), bg='#2B65EC')
    label1.place(x=400, y=328)
    loginbutton = Button(login, width=15, height=1, font=('semi bold', 35, 'normal'), bg='#C72542', text='LOGIN', command=logincheck)
    loginbutton.place(x=760, y=450)

    def show_pswd():
       if l2.cget("show") == "*": 
          l2.config(show='')
       else:
          l2.config(show='*')
    
    c_button = Checkbutton(root, text="show password", font=('semi bold', 24, 'normal'), command=show_pswd)
    c_button.place(x=750, y=395)
   
log()
root.mainloop()