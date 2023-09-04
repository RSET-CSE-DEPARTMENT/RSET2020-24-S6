from tkinter import *
from datetime import *
from tkinter import messagebox
from selenium import webdriver
import sqlite3
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException, TimeoutException
import traincodeextract as tc
from selenium.webdriver.common.by import By
import serial
root = Tk()
root.geometry("1920x1080")
root.title("AUTOMATED RAILWAY CROSSING")
global incorrect_id_label,password_error_label
today = date.today()
d2 = today.strftime("%B %d,%Y")
def change():
    b1.config(image=bimg2, state=DISABLED)
    id = e1.get()
    p1 = e2.get()
    print(id, p1)
    if id != 'IR0897':
        root.after(1000,show_id_error)
    elif p1 != '123456':  # Replace 'password' with the correct password
        root.after(1000,show_password_error)
    else:
        incorrect_id_label.config(text="")
        password_error_label.config(text="")
        root.after(2000,show_frame1)
global mainpg,bimg,bimg2,bimg3,fr3,op2,cl2,ex
mainpg = PhotoImage(file = 'main3.png')
bimg = PhotoImage(file = 'CTA.png')
bimg2 = PhotoImage(file = 'load.png')
bimg3 = PhotoImage(file = 'continue.png')
fr3 = PhotoImage(file = 'nframe3.png')
op2 = PhotoImage(file = 'open2.png')
cl2 = PhotoImage(file = 'close2.png')
ex = PhotoImage(file = 'exit 1.png')

login_f=Frame(root)
login_f.pack()
login_c=Canvas(login_f,height=1080,width=1920,bg='black')
login_c.pack(fill = "both",expand=True)
login_c.create_image( 0, 0,image =mainpg,anchor=NW)

e1= Entry(login_c,width=25,bg="#e4e4e4",font=("Times", 25))
e1.place(x=820,y=295)
e1.config(highlightthickness=2, highlightcolor="blue")
'''t1=Text(login_c,width=50,height=2,bg="#e4e4e4")
t1.place(x=820,y=320)'''
e2= Entry(login_c,text='Enter Password',width=25,font=("Times", "25"),bg="#e4e4e4",show="*")
e2.config(highlightthickness=2, highlightcolor="blue")
e2.place(x=820,y=395)
b1=Button(login_c,image=bimg,borderwidth=0,bg='#FFFFFF',cursor='hand2',command=change)
b1.place(x=860,y=492)
c_v1=IntVar(value=0)

def my_show():
    if(c_v1.get()==1):
        e2.config(show='')
    else:
        e2.config(show='*')

c1 = Checkbutton(login_c,text='Show Password',variable=c_v1,
onvalue=1,offvalue=0,command=my_show,borderwidth=0,bg='#FFFFFF',font=("Sans",10),cursor='hand2')
c1.place(x=820,y=462)

def show_password_error():
    e2.delete(0, END)
    b1.config(image=bimg,state=NORMAL)
    e2.config(highlightthickness=2, highlightbackground="red", highlightcolor="red")
    password_error_label.place(x=820, y=442)

def show_id_error():
    e1.delete(0, END)
    b1.config(image=bimg,state=NORMAL)
    e1.config(highlightthickness=2, highlightbackground="red", highlightcolor="red")
    incorrect_id_label.place(x=820, y=342)
   
incorrect_id_label = Label(login_c, text="Incorrect ID", fg="red",bg="white")
password_error_label = Label(login_c, text="Incorrect password", fg="red",bg='white')

def force():
    messagebox.showwarning("Warning","CLOSING")
    arduino = serial.Serial('com3', 115200)##locks the port
    print('Established serial connection to Arduino') 
    cmd="FCLOSE"
    time.sleep(2)
    arduino.write(cmd.encode())
    time.sleep(2)
    arduino.close()
def opening():
    messagebox.showwarning("Warning","OPENING")
    arduino = serial.Serial('com3', 115200)##locks the port
    print('Established serial connection to Arduino') 
    cmd="FOPEN"
    time.sleep(2)
    arduino.write(cmd.encode())
    time.sleep(2)
    arduino.close()
def des():
    root.after(2000)
    root.destroy()

def show_frame1():
    global frame2,acer
    login_f.pack_forget()  # Hide the login frame
    frame2 = Frame(root)
    frame2.pack()
    acer = Canvas(frame2, height=1080, width=1920, bg='black')
    acer.pack(fill="both", expand=True)
    id_error_img = PhotoImage(file='Home.png')
    acer.image = id_error_img  # Keep a reference to the image
    acer.create_image(0, 0, image=id_error_img, anchor=NW)

    e3= Entry(acer,width=18,bg="#e4e4e4",font=("Times", 25))
    e3.config(highlightthickness=2, highlightcolor="blue")
    e3.place(x=170,y=415)
    e4= Entry(acer,width=18,font=("Times", "25"),bg="#e4e4e4")
    e4.config(highlightthickness=2, highlightcolor="blue")
    e4.place(x=570,y=415)
    def bclick():
        tc1=e3.get()
        tc2=e4.get()
        mainexec(tc1,tc2)
        frame2.destroy()
        acer.destroy()

        frame3=Frame(root)
        frame3.pack()
        f3=Canvas(frame3,height=1080,width=1920,bg='black')
        f3.pack(fill = "both",expand=True)
        f3.create_image( 0, 0,image =fr3,anchor=NW)

        #dbms
        # Connect to the database
        conn = sqlite3.connect('C:\\Users\\hp\\Train.db')  # Replace with the path to your database file
        # Create a cursor
        cursor = conn.cursor()

        def db():
            now = datetime.now()
            cur = now.strftime("%H:%M")
            sql="select Traincode,Arrival,Station from details where Arrival>'{}'".format(cur)
            cursor.execute(sql)
            p=cursor.fetchall()
            dl1= Label(f3,width=10,font=("Times",10),bg="#FFFFFF",text=d2)
            dl1.place(x=65,y=40)
            try:
                l1= Label(f3,width=25,font=("Times", 18),bg="#e6f2ff",text=p[0][0])
                l1.place(x=1200,y=130)
                l12= Label(f3,width=25,font=("Times", 18),bg="#e6f2ff",text=p[0][1])
                l12.place(x=1200,y=175)
                l13= Label(f3,width=25,font=("Times", 18),bg="#e6f2ff",text=p[0][2])
                l13.place(x=1200,y=220)
            except:
                l1= Label(f3,width=25,font=("Times", 18),bg="#e6f2ff",text='')
                l1.place(x=1200,y=130)
                l12= Label(f3,width=25,font=("Times", 18),bg="#e6f2ff",text='NO TRAIN')
                l12.place(x=1200,y=180)
                l13= Label(f3,width=25,font=("Times", 18),bg="#e6f2ff",text='')
                l13.place(x=1200,y=230)
            try:
                l2= Label(f3,text=(p[1][0]),width=10,font=("Times", "17"),bg='#FFFFFF')
                l2.place(x=880,y=350)
                l21= Label(f3,text=(p[1][1]),width=10,font=("Times", "17"),bg='#FFFFFF')
                l21.place(x=1050,y=350)
                l22= Label(f3,text=(p[1][2]),width=30,font=("Times", "17"),bg='#FFFFFF')
                l22.place(x=1200,y=350)
            except:
                l2= Label(f3,text='',width=10,font=("Times", "17"),bg='#FFFFFF')
                l2.place(x=880,y=350)
                l21= Label(f3,text='NO TRAIN',width=10,font=("Times", "17"),bg='#FFFFFF')
                l21.place(x=1050,y=350)
                l22= Label(f3,text='',width=30,font=("Times", "17"),bg='#FFFFFF')
                l22.place(x=1200,y=350)
            try:
                    
                l3= Label(f3,text=p[2][0],width=10,font=("Times", "17"),bg='#FFFFFF')
                l3.place(x=880,y=460)
                l31= Label(f3,text=p[2][1],width=10,font=("Times", "17"),bg='#FFFFFF')
                l31.place(x=1050,y=460)
                l32= Label(f3,text=p[2][2],width=30,font=("Times", "17"),bg='#FFFFFF')
                l32.place(x=1200,y=460)
            except:
                l3= Label(f3,text='',width=10,font=("Times", "17"),bg='#FFFFFF')
                l3.place(x=880,y=460)
                l31= Label(f3,text='NO TRAIN',width=10,font=("Times", "17"),bg='#FFFFFF')
                l31.place(x=1050,y=460)
                l32= Label(f3,text='',width=30,font=("Times", "17"),bg='#FFFFFF')
                l32.place(x=1200,y=460)
            try:
                l4= Label(f3,text=p[3][0],width=10,font=("Times", "17"),bg='#FFFFFF')
                l4.place(x=880,y=570)
                l41= Label(f3,text=p[3][1],width=10,font=("Times", "17"),bg='#FFFFFF')
                l41.place(x=1050,y=570)
                l42= Label(f3,text=p[3][2],width=30,font=("Times", "17"),bg='#FFFFFF')
                l42.place(x=1200,y=570)
            except:
                l4= Label(f3,text='',width=10,font=("Times", "17"),bg='#FFFFFF')
                l4.place(x=880,y=570)
                l41= Label(f3,text='NO TRAIN',width=10,font=("Times", "17"),bg='#FFFFFF')
                l41.place(x=1050,y=570)
                l42= Label(f3,text='',width=30,font=("Times", "17"),bg='#FFFFFF')
                l42.place(x=1200,y=570)
            root.after(5000,db)


        #calling func to show dbms
        db()

        s1=tc1.upper()
        s2=tc2.upper()
        
        ls1= Label(f3,text=s1,width=10,font=("Times", "20"),bg="#e6f2ff")
        ls1.place(x=100,y=190)
        ls2= Label(f3,text=s2,width=10,font=("Times", "20"),bg="#e6f2ff")
        ls2.place(x=550,y=190)

        b1=Button(f3,image=op2,borderwidth=0,bg='#FFFFFF',cursor='hand2',command=opening)
        b1.place(x=150,y=331)
        b2=Button(f3,image=cl2,borderwidth=0,bg='#FFFFFF',cursor='hand2',command=force)
        b2.place(x=500,y=331)
        b3=Button(f3,image=ex,borderwidth=0,bg='#FFFFFF',cursor='hand2',command=des)
        b3.place(x=1450,y=20)
        
    b2=Button(acer,image=bimg3,borderwidth=0,bg='#FFFFFF',cursor='hand2',command=bclick)
    b2.place(x=348,y=500)
    l1=Label(acer,text=d2,width=8,bg='#FFFFFF')
    l1.place(x=900,y=50)

"""from_code=input("Enter code of station one:")
to_code=input("Enter code of station two:")"""
def scrape_details(train_number,firststat):
    # Load the webpage
    options = Options()
    capa = DesiredCapabilities.CHROME
    capa["pageLoadStrategy"] = "none"
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--ignore-ssl-errors')
    options.headless = False  # Run the browser in headless mode,slower
    # Set up the Selenium driver (Replace the path with your own chromedriver path)
    driver_path = 'C:\\Users\\hp\\Downloads\\chromedriver.exe'
    service = Service(driver_path)
    driver = webdriver.Chrome(service=service, options=options,desired_capabilities=capa)
    wait = WebDriverWait(driver,20)
    # Connect to the database
    conn = sqlite3.connect('C:\\Users\\hp\\Train.db')  # Replace with the path to your database file
    # Create a cursor
    cursor = conn.cursor()
    #cursor.execute('DROP TABLE details')
    url = f"https://www.railyatri.in/live-train-status/{train_number}"
    driver.get(url)
    try:
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'table-responsive')))
        driver.execute_script("window.stop();")
    except(TimeoutException):
        print("ERROR DETECTED")
        return -1
    else:      
    # Always drop existing tables if any
    # Create a table if it doesn't exist
        cursor.execute('''CREATE TABLE IF NOT EXISTS details (
                            Traincode TEXT,
                            Station TEXT,
                            Arrival TEXT,
                            [Train Status] TEXT,
                            [Halt Time] TEXT,
                            Platform TEXT,
                            [Locomotive Reverse] TEXT
                        )''')
        # Find the parent element containing the table
        parent_element = driver.find_element("class name", "table-responsive")
        # Find all the table rows within the parent element
        rows = parent_element.find_elements("tag name", "tr")
        # Iterate over the rows to extract and insert the details
        for row in rows:
        # Find the columns within the row
            columns = row.find_elements("tag name", "td")
            if len(columns) >= 6:
            # Retrieve the text of each column
                station = columns[0].text
                arrival = columns[1].text
                status = columns[2].text
                halt_time = columns[3].text
                platform = columns[4].text
                loco_reverse = columns[5].text
                str1=(firststat.upper())[1:]
                str2=station.upper()             
                if(str1 in str2):
                    # Insert the detail into the database
                    cursor.execute("INSERT INTO details (Traincode,Station, Arrival, [Train Status], [Halt Time], Platform, [Locomotive Reverse]) VALUES (?, ?, ?, ?, ?, ?, ?)", (train_number, station, arrival, status, halt_time, platform, loco_reverse))
                    print('done')
                    conn.commit()
                    return 1
        # Commit the transaction
        # Close the cursor and connection  
    cursor.close()
    conn.close()
def mainexec(tc1,tc2):
    tcodes=tc.traincode(tc1,tc2)
    testc=5
    print(tcodes)
    #modify testcaccording to no of train values needed
    for i in tcodes:
        if(testc==0):
            break
        else:
            status=0
            while(status!=1):
                chances=5
                status=scrape_details(i,tcodes[i])
                if(status!=1):
                    chances=chances-1
                if(chances==0):
                    break    
            testc-=1     
# Quit the browser
