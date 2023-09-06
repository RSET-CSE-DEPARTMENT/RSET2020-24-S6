from flask import Flask, render_template, request, redirect, url_for, session, g
import sqlite3

app = Flask(__name__)
app.secret_key = 'SecretKey'
DATABASE = 'users.db'


# Database setup and connection
def get_db():
   if 'db' not in g:
       g.db = sqlite3.connect(DATABASE)
       g.db.row_factory = sqlite3.Row
   return g.db


@app.teardown_appcontext
def close_db(error):
   if hasattr(g, 'db'):
       g.db.close()


# Create a user table if it doesn't exist
def create_user_table():
   db = get_db()
   db.execute("""
       CREATE TABLE IF NOT EXISTS users (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           name TEXT NOT NULL,
           email TEXT NOT NULL UNIQUE
       )
   """)
   db.commit()


# Dummy admin credentials for demonstration purposes
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = '123'


def is_authenticated():
   return 'username' in session


@app.route('/')
def home():
   if is_authenticated():
       return redirect(url_for('admin'))
   return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
   username = request.form.get('username')
   password = request.form.get('password')

   if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
       session['username'] = username
       create_user_table()  # Create the user table if it doesn't exist
       return redirect(url_for('admin'))
   else:
       return redirect(url_for('home'))


@app.route('/logout')
def logout():
   session.pop('username', None)
   return redirect(url_for('home'))


@app.route('/admin', methods=['GET', 'POST'])
def admin():
   if not is_authenticated():
       return redirect(url_for('home'))

   db = get_db()
   if request.method == 'POST':
       name = request.form.get('name')
       email = request.form.get('email')
       action = request.form.get('action')

       if action == 'insert':
           db.execute("INSERT INTO users (name, email) VALUES (?, ?)", (name, email))
           db.commit()
       elif action == 'update':
           user_id = request.form.get('user_id')
           db.execute("UPDATE users SET name=?, email=? WHERE id=?", (name, email, user_id))
           db.commit()
       elif action == 'delete':
           user_id = request.form.get('user_id')
           db.execute("DELETE FROM users WHERE id=?", (user_id,))
           db.commit()

   users = db.execute("SELECT * FROM users").fetchall()
   return render_template('admin.html', users=users)

@app.route('/act')
def show_activities():

    conn = sqlite3.connect('Activities.db')
    c = conn.cursor()


    c.execute("SELECT * FROM Activities")
    activities = c.fetchall()


    conn.close()


    return render_template('act.html', activities=activities)

if __name__ == '__main__':
   app.run(debug=True)


