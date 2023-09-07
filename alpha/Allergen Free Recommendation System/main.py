from flask import Flask, render_template, request, redirect, flash, jsonify, session
from flask_mysqldb import MySQL
import yaml
import openai

app = Flask(__name__)
app.secret_key = 'your_secret_key'  
# Configure the database
db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)


def chatbot(msg):
    openai.api_key = "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"

    conversation = []

    conversation.append({"role": "system", "content": "allergen chatbot"})
    while input != "quit()":
        message = msg
        conversation.append({"role": "user", "content": message})
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation)
        reply = response["choices"][0]["message"]["content"]
        conversation.append({"role": "assistant", "content": reply})
        return reply

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if 'email' in request.form and 'password'in request.form and 'name' not in request.form:
            email = request.form['email']
            password = request.form['password']

            cur = mysql.connection.cursor()
            cur.execute('SELECT * FROM userdata WHERE email = %s AND password = %s', (email, password))
            user = cur.fetchone()

            cur.execute('SELECT name FROM userdata WHERE email = %s', (email,))
            usrname = cur.fetchone()

            cur.close()

            if user:
                session['username'] = usrname[0]
                session['email'] = email
                global USER_ID
                USER_ID = session['username']

                flash('Login successful!', 'success')
                return redirect ('/home?username=' + usrname[0] + '&email=' + email)
            else:
                flash('Invalid username or password', 'error')

        else:
            name = request.form['name']
            email = request.form['email']
            password = request.form['password']
            
            print(name, email, password)
            cur = mysql.connection.cursor()
            cur.execute('SELECT * FROM userdata WHERE name = %s OR email = %s', (name, email))
            existing_user = cur.fetchone()

            if existing_user is not None:
                flash('An account with the provided credentials already exists', 'error')
            else:
                session['username'] = name
                session['email'] = email
                cur.execute('INSERT INTO userdata (name, email, password) VALUES (%s, %s, %s)', (name, email, password))
                mysql.connection.commit()
                return redirect('/home?username=' + name + '&email=' + email)

            cur.close()

    return render_template('login.html')




@app.route('/home', methods=['GET', 'POST'])
def index():
    
    print(USER_ID)
    username = session['username']
    email = session['email']
        
    cur = mysql.connection.cursor()
    cur.execute('SELECT allergies FROM userdata WHERE email = %s', (email,))
    saved_allergies = cur.fetchone()

    allergens = "almonds, rice, milk"

    if saved_allergies is not None:
        allergens = saved_allergies[0]
   
    username = request.args.get('username')
    email = request.args.get('email')
    return render_template('index.html', username=username, email=email, allergens=allergens)

@app.route('/predict', methods=['POST'])
def predict():
    system_msg = request.get_json().get("message")
    response = chatbot(system_msg)
    message = {"answer": response}
    return jsonify(message)

# @app.route('/userinfo', methods=['GET', 'POST'])
# def userinfo():
#     if 'username' in session:
#         if 'logout' in request.form:
#             session.clear()
#             return redirect('/')
        
#         # username = request.args.get('username')
#         # email = request.args.get('email')
#         username = session['username']
#         email = session['email']
        
#         return render_template('userinfo.html', username=username, email=email)
#     return redirect('/')

@app.route('/userinfo', methods=['GET', 'POST'])
def userinfo():
    if 'username' in session:
        if 'logout' in request.form and request.method == "POST":
            session.clear()
            return redirect('/')
        
        username = session['username']
        email = session['email']
        
        cur = mysql.connection.cursor()
        cur.execute('SELECT allergies FROM userdata WHERE email = %s', (email,))
        saved_allergies = cur.fetchone()
        
        if save_allergies is None:
            saved_allergies = ('No allergens entered',)
        return render_template('userinfo.html', username=username, email=email, allergens=saved_allergies[0])
    
    return redirect('/')

@app.route('/save_allergies', methods=['POST'])
def save_allergies():

    email = session['email']

    cur = mysql.connection.cursor()
    saved_allergies = cur.execute('SELECT allergies FROM userdata WHERE email = %s', (email,))

    

    data = request.get_json()
    saved_allergies = data['allergies']  # Access the saved allergies sent from JavaScript
    
    
    cur.execute('UPDATE userdata SET allergies = %s WHERE email = %s ', (saved_allergies, email))
    
    # Prepare the response data
    response_data = {
        'message': 'Allergies saved successfully'
    }
    mysql.connection.commit()
    cur.close()

        # Return the response as JSON
    return jsonify(response_data)



if __name__ == '__main__':
    app.run(debug=True, port=5050)

