import os
import mysql.connector
from flask import *
import numpy as np
import tensorflow as tf
from werkzeug.utils import secure_filename
from io import BytesIO
import string

from PIL import Image


app = Flask(__name__)
app.static_folder='static'
app.secret_key='secre_key'
class_names = ['Low', 'Moderate', 'Severe']
def get_model():
    global model1
    model1 = tf.keras.models.load_model('saved_model/my_model')

def load_image(image):
    img = Image.open(image)
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img 

def prediction_acne(img_path):
    new_image = load_image(img_path)
    pred = model1.predict(new_image)
    # print(pred2)
    if len(pred[0]) > 1:
        pred_class = class_names[tf.argmax(pred[0])]
    else:
        pred_class = class_names[int(tf.round(pred[0]))]
    return pred_class


get_model()





@app.route("/")
def skin1():
    return render_template("index.html")


@app.route("/Get Started")
def about():
    return render_template("signin.html")

@app.route("/signin", methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
            
        conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='123',
        db='skin'
        )
        cursor = conn.cursor()
            
        query = "SELECT * FROM customer WHERE email = %s AND password = %s"
        values = (email, password)
            
        cursor.execute(query, values)
        user = cursor.fetchone()
            
        cursor.close()
        conn.close()
            
        if user:
            return redirect('/dashboard')
        else:
            flash('ACCOUNT DOES NOT EXIST','error')    
        
    return render_template('signin.html')

@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='123',
        db='skin'
        )
        
       
        if (".in" in email or ".com" in email) and len(password)>7:
           
           if any(char in string.punctuation for char in password)!= True:
             flash('INCLUDE SPECIAL CHARACTER IN PASSWORD','error')

           else:
              
            cursor = conn.cursor()
            
            query = "SELECT email FROM customer WHERE email = %s AND password = %s"
            values = (email,password)
            
            cursor.execute(query, values)
            user = cursor.fetchone()
            
            cursor.close()
            conn.close()
            
            if user:
             flash('ACCOUNT ALREADY EXISTS','error')

            else:
             conn = mysql.connector.connect(
             host='localhost',
             user='root',
             password='123',
             db='skin'
              )
             cursor = conn.cursor()
             query = "INSERT INTO customer (email, password) VALUES (%s, %s)"
             values = (email, password)
            
             cursor.execute(query, values)
             conn.commit()
            
             cursor.close()
             conn.close()
        
        else:
             flash('INVALID EMAIL OR PASSWORD','error')
        
        
    return render_template('signup.html')

@app.route("/dashboard")
def dashboard():
    return render_template("type.html")


@app.route("/Oily Skin")
def oily():
    global oil, dry1, combi
    dry1= 0
    combi=0
    oil= 1
    return render_template("upload11.html")

@app.route("/Dry Skin")
def dry():
    global oil, dry1, combi
    combi=0
    oil= 0
    dry1=1
    return render_template("upload11.html")

@app.route("/Combination Skin")
def comb():
    global oil, dry1, combi
    oil= 0
    dry1=0
    combi=1
    return render_template("upload11.html")




@app.route("/success", methods = ["POST"])
def success():
    if request.method == "POST":
        f = request.files['file'] 
        filename= f.filename
        file_path = os.path.join('static',secure_filename(filename))                       
        f.save(file_path)
        p = prediction_acne(file_path)
        conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='123',
        db='skin'
    )

    # Execute the query to retrieve data based on the prediction
    if p== "Low":
      if oil==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and oily=1 and ingredients like '%Aloe%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and oily=1 and ingredients like '%Witch%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and oily=1 and ingredients like '%Retinol%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and oily=1 and ingredients like '%Niacin%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and oily=1 and ingredients like '%Retinol%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and oily=1 and ingredients like '%Aloe%' order by rand() limit 1")
        data5 = cursor.fetchall()


      if dry1==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and dry=1 and ingredients like '%Hyaluronic%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and dry=1 and ingredients like '%Glycerin%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and dry=1 and ingredients like '%Ceramide%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and dry=1 and ingredients like '%Shea%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and dry=1 and ingredients like '%Oat%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and dry=1 and ingredients like '%Aloe%' order by rand() limit 1")
        data5 = cursor.fetchall()

      
      if combi==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and combination=1 and ingredients like '%Green Tea%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and combination=1 and ingredients like '%Lactic%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and combination=1 and ingredients like '%Niacin%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and combination=1 and ingredients like '%Jojoba%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and combination=1 and ingredients like '%Green Tea%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and combination=1 and ingredients like '%Niacin%' order by rand() limit 1")
        data5 = cursor.fetchall()

    elif p== "Moderate":
      
      if oil==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and oily=1 and ingredients like '%Niacin%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and oily=1 and ingredients like '%Salicylic%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and oily=1 and ingredients like '%Benzoyl%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and oily=1 and ingredients like '%Tea%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and oily=1 and ingredients like '%Retinol%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and oily=1 and ingredients like '%Aloe%' order by rand() limit 1")
        data5 = cursor.fetchall()


      if dry1==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and dry=1 and ingredients like '%Hyaluronic%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and dry=1 and ingredients like '%Calendula%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and dry=1 and ingredients like '%Ceramide%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and dry=1 and ingredients like '%Shea%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and dry=1 and ingredients like '%Bakuchiol%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and dry=1 and ingredients like '%Ceramides%' order by rand() limit 1")
        data5 = cursor.fetchall()

      
      if combi==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and combination=1 and ingredients like '%Tea Tree%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and combination=1 and ingredients like '%Salicylic%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and combination=1 and ingredients like '%Retinol%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and combination=1 and ingredients like '%Zinc%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and combination=1 and ingredients like '%Retinol%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and combination=1 and ingredients like '%Witch%' order by rand() limit 1")
        data5 = cursor.fetchall()


    elif p== "Severe":
      
      if oil==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and oily=1 and ingredients like '%Benzoyl%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and oily=1 and ingredients like '%Zinc%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and oily=1 and ingredients like '%Glycol%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and oily=1 and ingredients like '%Aloe%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and oily=1 and ingredients like '%Retinol%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and oily=1 and ingredients like '%Hyaluronic%' order by rand() limit 1")
        data5 = cursor.fetchall()


      if dry1==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and dry=1 and ingredients like '%Hyaluronic%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and dry=1 and ingredients like '%Bakuchiol%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and dry=1 and ingredients like '%Centella%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and dry=1 and ingredients like '%Squalene%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and dry=1 and ingredients like '%Hyaluronic%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and dry=1 and ingredients like '%Niacin%' order by rand() limit 1")
        data5 = cursor.fetchall()

      
      if combi==1:
        cursor = conn.cursor()
        cursor.execute("SELECT label,name FROM sephore WHERE label='Moisturizer' and combination=1 and ingredients like '%Licorice%' order by rand() limit 1")
        data = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Cleanser' and combination=1 and ingredients like '%Salicylic%' order by rand() limit 1")
        data1 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Treatment' and combination=1 and ingredients like '%Vitamic C%' order by rand() limit 1")
        data2 = cursor.fetchall()

        cursor.execute("SELECT label,name FROM sephore WHERE label='Face Mask' and combination=1 and ingredients like '%Retinol%' order by rand() limit 1")
        data3 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Eye cream' and combination=1 and ingredients like '%Rosemary%' order by rand() limit 1")
        data4 = cursor.fetchall()
        
        cursor.execute("SELECT label,name FROM sephore WHERE label='Sun protect' and combination=1 and ingredients like '%Titanium%' order by rand() limit 1")
        data5 = cursor.fetchall()



    


    cursor.close()
    conn.close()

    return render_template('success.html',p=p,data=data,data1=data1,data2=data2,data3=data3,data4=data4,data5=data5)
       # Close the connection

if __name__ == "__main__":
   app.run(port = 12000,debug=True)