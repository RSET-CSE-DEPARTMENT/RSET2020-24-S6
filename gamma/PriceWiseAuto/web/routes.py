import secrets
import os
from flask import render_template,url_for,flash,redirect,request,abort
from flask_cors import cross_origin
from web import app,db,bcrypt
from flask_login import login_user, current_user, logout_user, login_required
from web.forms import RegistrationForm,LoginForm, UpdateAccountForm
from PIL import Image
from web.model import User
import pickle
import pandas as pd
import numpy as np

import csv
from collections import defaultdict
def read_csv_file(filename, key_column, value_column):
    result = defaultdict(list)  
    
    with open(filename, 'r') as file:
        reader = csv.DictReader(file)  
        for row in reader:
            key = row[key_column]  
            value = row[value_column]  
            if key in result.keys():
                if value in result[key]:
                    continue    
                result[key].append(value)  
            else:
                result[key].append(value)
    return result
filename = 'D:\Miniproject\web\cars.csv'  
key_column = 'Name'  
value_column = 'Model'   

data = read_csv_file(filename, key_column, value_column)



lrmodel=pickle.load(open('D:\Miniproject\web\LRModel.pkl','rb'))
car=pd.read_csv('D:\Miniproject\web\cars.csv')
@app.route('/')
def intro():
    return render_template('intro.html')

@app.route("/login",methods=["GET","POST"])
def login():
    form=LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and bcrypt.check_password_hash(user.password,form.password.data):
            login_user(user,remember=form.remember.data)   
            next_page= request.args.get('next') 
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash("Login failed check username and password ","danger")
    return render_template('login.html',title='Login',form=form)

@app.route('/home',methods=['GET','POST'])
def home():
    name=car['Name'].unique().tolist()
    year=sorted(car['Year'].unique(),reverse=True)
    fuel_type=car['Fuel'].unique().tolist()
    type=car['Type'].unique().tolist()
    car_model=car['Model'].unique().tolist()
    
    name.insert(0,'Select Car Name')
    year.insert(0,'Select Year')
    fuel_type.insert(0,'Select fuel type')
    type.insert(0,'Select transmission type ')
    car_model.insert(0,'Select car model')
    
    return render_template('home.html' ,data=data,names=name,car_models=car_model, years=year,fuel_types=fuel_type,type=type)


@app.route('/predict',methods=['POST'])
@cross_origin()
def predict():

    name=request.form.get('names')
    print(name)
    model=request.form.get('car_models')
    print(model)
    year=request.form.get('year')
    print(year)
    fuel_type=request.form.get('fuel_type')
    print(fuel_type)
    type=request.form.get('type')
    print(type)
    ownership=request.form.get('ownership')
    print(ownership)
    kms=request.form.get('kms')
    print(kms)
    prediction=lrmodel.predict(pd.DataFrame(columns=['Name','Year','Kms','Fuel','Type','Ownership','Model'],data=np.array([name,year,kms,fuel_type,type,ownership,model]).reshape(1, 7)))
    print(prediction)

    return str(np.round(prediction[0],2))

@app.route("/register",methods=["GET","POST"])
def register():
    
    form=RegistrationForm()
    if form.validate_on_submit():
        h_pwd= bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user= User(username=form.username.data, email=form.email.data,password=h_pwd)
        db.session.add(user)
        db.session.commit()
        flash(f'Account created successfully!','success')
        return redirect(url_for('login'))
    return render_template('register.html',title='Register',form=form)

@app.route("/index",methods=["GET","POST"])
def index():
    return render_template('index.html',title='Trends')


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('intro'))

def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)

    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn

@app.route("/account",methods=["GET","POST"])
@login_required
def account():
    form=UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html',title='Account',image_file =image_file,form=form)