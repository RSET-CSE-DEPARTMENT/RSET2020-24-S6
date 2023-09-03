from flask import Flask, request, render_template, redirect, session, jsonify, url_for
from flask_pymongo import pymongo
import json
import requests
import time
import os
import speech_recognition as sr
from pydub import AudioSegment
import openai
from dotenv import load_dotenv
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user, login_required
from datetime import datetime, timedelta
from bcrypt import hashpw, gensalt, checkpw
import base64
from flask_caching import Cache

load_dotenv()


app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

app.config['CACHE_TYPE'] = 'simple'
cache = Cache(app)

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# MongoDB setup
CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.get_database('Sound-bite')

openai.api_key = os.getenv("OPENAI_API_KEY")


class User(UserMixin):
    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password

    def get_id(self):
        return self.email


@login_manager.user_loader
def load_user(user_id):
    user_data = db.users.find_one({"email": user_id})
    if user_data:
        return User(user_data['email'], user_data['username'], user_data['password'])
    return None


def gptAPI(prompt, content):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": "{} {}".format(prompt, content)}
            ]
        )
        data = response['choices'][0]['message']['content']
    except (Exception):
        data = "Server down"
    return data


@app.route("/")
def home():
    session["summary"] = ""
    session["transcript"] = ""
    if current_user.is_authenticated:
        return render_template("home.html", user=current_user.username)
    else:
        return render_template("home.html", user=None)


@app.route("/upload", methods=['POST'])
def upload():
    if request.method == "POST":
        f = request.files['audio_data']
        name = request.files['audio_data'].filename
        name = name.replace(":", "-")
        name = name.replace(".", "-") + '.wav'
        with open(name, 'wb') as audio:
            f.save(audio)
        print('file uploaded successfully')

        # transcription / summarization function calls here
        AUDIO_FILE = name
        # use the audio file as the audio source
        r = sr.Recognizer()
        with sr.AudioFile(AUDIO_FILE) as source:
            audio = r.record(source)  # read the entire audio file
            transcription = r.recognize_whisper(audio, language="english")

        # deleting audio file after use
        os.remove("./" + name)

        # summarizer
        prompt = "Please provide a summary of the following text (response should have no introductory phrases nor any chat like elements in the writing style of the summary. If no input text provided, respond exactly with no content to summarize). Here is the input text:"
        summary = gptAPI(prompt, transcription)

        session["summary"] = summary
        session["transcript"] = transcription

        data = {
            "transcript": transcription,
            "summary": summary
        }

        return data


@app.route("/template", methods=['POST'])
@login_required
def template():
    if request.method == "POST":
        data = request.json
        content = ""
        if data["template"] == "default":
            return session["summary"]
        if data["template"] == "bullet":
            content = session["summary"]
            prompt = "Insert the given summary into bullet points format (response should have no introductory phrases nor any chat like elements in the writing style )"
        if data["template"] == "minutes":
            prompt = "Produce meeting minutes, given the date, and a transcript of the conversation (in case the transcript is not in the format of a conversation, extract the main points for use in meeting minutes) (follow standard meeting minutes format as closely as possible with the given data). Here is the data : "
            content = "date: {} transcript: {}".format(
                data["date"], session["transcript"])

        #   prompt="Insert the given summary into minutes of a meeting format (response should have no introductory phrases nor any chat like elements in the writing style )"
        summary = gptAPI(prompt, content)
        return summary


@app.route("/save", methods=['GET', 'POST'])
@login_required
def save():
    if session["summary"] == "":
        return redirect(url_for('home'))
    else:
        return render_template("save.html", summary=session["summary"], user=current_user.username)


@app.route("/saveupload", methods=['GET', 'POST'])
def saveupload():
    if request.method == "POST":
        data = request.json
        db.summaries.insert_one(
            {"email": current_user.email, "title": data['title'], "categories": data['categories'], "summary": data['summary'], "timestamp": data["timestamp"]})
        session["summary"] = ""
        return redirect(url_for('saved'))


@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    if request.method == "POST":
        data = request.json
        user = load_user(data['email'])
        if user is None:
            return "email"
        elif not checkpw(data['password'].encode('utf-8'), user.password):
            return "password"
        else:
            login_user(user)
            return "Success"

    return render_template("login.html")


@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))

    if request.method == "POST":
        data = request.json
        existing_user = load_user(data['email'])
        if existing_user is None:
            # Encrypt the password
            hashed_password = hashpw(
                data['password'].encode('utf-8'), gensalt())

            db.users.insert_one(
                {"email": data['email'], "username": data['username'], "password": hashed_password})
            return "Success"
        else:
            return "email"

    return render_template("register.html")


@app.route("/saved")
@login_required
def saved():
    return render_template("saved.html", user=current_user.username)


@app.route("/search", methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        data = request.json

        query = {}
        if data['input'] != "":
            query["$or"] = [
                {"title": {"$regex": data['input'], "$options": "i"}},
                {"summary": {"$regex": data['input'], "$options": "i"}}
            ]

        if data["categories"] != []:
            query["categories"] = {"$all": data["categories"]}
        if data['timestamp']:
            # Convert JavaScript timestamp to Python datetime
            timestamp_datetime = datetime.fromtimestamp(
                data["timestamp"] / 1000)
            # Divide by 1000 to convert milliseconds to seconds

            # Extract start and end dates
            start_date = timestamp_datetime.replace(
                hour=0, minute=0, second=0, microsecond=0)
            end_date = start_date + timedelta(days=1)
            query["timestamp"] = {"$gte": start_date.timestamp(
            ) * 1000, "$lt": end_date.timestamp() * 1000}

        query["email"] = current_user.email
        projection = {
            "title": 1,    # Include the 'title' field
            "summary": 1,  # Include the 'summary' field
            "categories": 1,
            "timestamp": 1,
            "_id": 0       # Exclude the '_id' field
        }

        response = db.summaries.find(query, projection)
        documents = list(response)

        return jsonify(documents)


@app.route('/deletesummary', methods=['POST'])
@login_required
def deletesummary():
    # Get the timestamp from the request body
    data = request.json

    # Delete the summary with the matching timestamp from the database
    db.summaries.delete_one({'timestamp': data["timestamp"]})

    return jsonify({'message': 'Summary deleted successfully'})


@app.route("/profile")
@login_required
def profile():
    return render_template("profile.html", user=current_user.username)


@app.route("/profile/api", methods={'GET', 'POST'})
@login_required
def profileApi():
    if request.method == 'POST':
        data = request.json

        # Get the current user
        user = current_user

        # Check if the provided old password matches the user's current password
        if not checkpw(data['oldPassword'].encode('utf-8'), user.password):
            return jsonify({"success": False, "error": "Password mismatch"})

        # If the new password is provided, update it
        if 'newPassword' in data:
            new_password = data['newPassword'].encode('utf-8')
            hashed_password = hashpw(new_password, gensalt())
            user.password = hashed_password

        # Update the username
        user.username = data['username']

        # Save the changes to the database
        db.users.update_one({"email": user.email}, {
                            "$set": {"username": user.username, "password": user.password}})

        return jsonify({"success": True, "username": user.username})
    if request.method == 'GET':
        return jsonify({"success": True, "username": current_user.username, "email": current_user.email})


@app.route("/image", methods={'POST'})
@login_required
def imageUpload():
    if 'file' not in request.files:
        return "No file part"

    file = request.files['file']
    if file.filename == '':
        return "No selected file"

    # Query the database for the profile picture associated with the user's email
    existing_picture = db.profilePics.find_one(
        {'email': current_user.email})

    # Save the uploaded image to MongoDB
    file_data = {
        'email': current_user.email,
        'data': file.read()  # Read the binary data of the image
    }

    if existing_picture:
        # Update the existing profile picture
        db.profilePics.update_one(
            {'email': current_user.email}, {"$set": file_data})
    else:
        # Insert a new profile picture document into the database
        db.profilePics.insert_one(file_data)

    cache.clear()
    return "File successfully uploaded to MongoDB"


@app.route("/image", methods={'GET'})
@login_required
@cache.cached(timeout=3600)
def imageGet():
    # Query the database for the profile picture associated with the user's email
    file_data = db.profilePics.find_one({'email': current_user.email})

    if file_data and 'data' in file_data:
        # Convert the binary image data to Base64 format
        encoded_image = base64.b64encode(file_data['data']).decode('utf-8')
        # Return the Base64 encoded image as JSON
        return jsonify({'image': encoded_image})
    else:
        return jsonify({'error': 'Profile picture not found'})


@app.route("/logout")
@login_required
def logout():
    logout_user()
    session.pop('summary')
    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True, port=8000)
