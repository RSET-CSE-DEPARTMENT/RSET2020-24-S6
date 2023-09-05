# Import necessary modules and classes from Flask, Flask-PyMongo, dotenv, and os
from flask import Flask
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables from a .env file (dotenv)
load_dotenv() 


# Create a Flask application instance
app = Flask(__name__)

# Configure the Flask application using environment variables
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")  #Set the Flask application's secret key by retrieving it from the "SECRET_KEY" environment variable.

app.config["MONGO_URI"] = os.getenv("MONGO_URL")  #Set the MongoDB URI for the Flask-PyMongo extension by retrieving it from the "MONGO_URL" environment variable.

#setup mongodb
mongodb_client = PyMongo(app)
db = mongodb_client.db


from api import routes  #Import the route handlers (URL endpoints) for the Flask application from the "api" module.

