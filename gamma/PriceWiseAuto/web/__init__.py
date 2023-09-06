from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app=Flask(__name__)
cors=CORS(app)
app.config['SECRET_KEY']='8b54d59c0c03e727b5c040fe940c022d'
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///log.db'
db=SQLAlchemy(app)
bcrypt=Bcrypt(app)
login_manager=LoginManager(app)
login_manager.login_view='login'
login_manager.login_message_category='info'

from web import routes