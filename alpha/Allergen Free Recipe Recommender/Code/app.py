from flask import Flask, render_template, request, redirect, flash, jsonify, session
from flask_mysqldb import MySQL
from typing import Dict, Text
import pprintpp

import numpy as np
import pandas as pd

import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_recommenders as tfrs

import random
import yaml
import openai
import requests


app = Flask(__name__)
app.secret_key = "YOUR SECRET KEY HERE"
# Configure the database
db = yaml.safe_load(open("db.yaml"))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']


RECIPE_LIST1 = []
RECIPE_LIST2 = []
RECIPE_LIST3 = []


mysql = MySQL(app)

def chatbot(msg):
    openai.api_key = "YOUR API KEY HERE"

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

#--------------------------------------------LOGIN----------------------------------------------#

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
            name = request.form.get('name', '')
            email = request.form.get('email', '')
            password = request.form.get('password', '')
            
            cur = mysql.connection.cursor()
            cur.execute('SELECT * FROM userdata WHERE name = %s OR email = %s', (name, email))
            existing_user = cur.fetchone()

            if existing_user is not None:
                flash('An account with the provided credentials already exists', 'error')
            else:
                session['username'] = name
                session['email'] = email

                USER_ID = name
                cur.execute('INSERT INTO userdata (name, email, password) VALUES (%s, %s, %s)', (name, email, password))
                mysql.connection.commit()
                return redirect('/home?username=' + name + '&email=' + email)

            cur.close()

    return render_template('login.html')

#---------------------------------------------------HOMEPAGE----------------------------------------------#

@app.route('/home', methods=['GET', 'POST'])
def index():

    username = session['username']
    email = session['email']
        
    cur = mysql.connection.cursor()
    cur.execute('SELECT allergies FROM userdata WHERE email = %s', (email,))
    saved_allergies = cur.fetchone()

    allergens = ("e.g. almonds, rice, milk", )

    if saved_allergies is not None:
        allergens = saved_allergies

    cur.execute('SELECT preferences FROM userdata WHERE email = %s', (email,))
    saved_pref1 = cur.fetchone()

    if saved_pref1 is None:
        saved_pref1 = ("e.g. eggs, cake, Indian", )
   
    username = request.args.get('username')
    email = request.args.get('email')
    return render_template('index.html', username=username, email=email, allergens=allergens[0], cuisine=saved_pref1[0])

#------------------------------------------ABOUT US-------------------------------------------

@app.route('/allergies', methods=['POST', 'GET'])
def allergies():
    return render_template('allergeninfo.html', username=session['username'])



#--------------------------------------------CHATBOT--------------------------------------------#

@app.route('/predict', methods=['POST'])
def predict():
    system_msg = request.get_json().get("message")
    response = chatbot(system_msg)
    message = {"answer": response}
    return jsonify(message)

#---------------------------------------------USERPROFILE------------------------------------------#

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

        cur.execute('SELECT preferences FROM userdata WHERE email = %s', (email,))
        saved_pref1 = cur.fetchone()
        
        if save_allergies is None:
            saved_allergies = ('No allergens entered',)

        if saved_pref1 is None:
            saved_pref1 = ('No preferences entered',)
        return render_template('userinfo.html', username=username, email=email, allergens=saved_allergies[0], cuisine = saved_pref1[0])
    
    return redirect('/')

#--------------------------------------SAVE ALLERGIES---------------------------------------#

@app.route('/save_allergies', methods=['POST'])
def save_allergies():

    email = session['email']

    cur = mysql.connection.cursor()
    saved_allergies2 = cur.execute('SELECT allergies FROM userdata WHERE email = %s', (email,))

    

    data = request.get_json()
    saved_allergies2 = data['allergies']  # Access the saved allergies sent from JavaScript
    
    
    cur.execute('UPDATE userdata SET allergies = %s WHERE email = %s ', (saved_allergies2, email))
    
    # Prepare the response data
    response_data = {
        'message': 'Allergies saved successfully'
    }
    mysql.connection.commit()
    cur.close()

        # Return the response as JSON
    return jsonify(response_data)

@app.route('/cuisinepreferences', methods=['POST'])
def cuisinepref():

    email = session['email']

    cur = mysql.connection.cursor()
    saved_pref = cur.execute('SELECT preferences FROM userdata WHERE email = %s', (email,))

    

    data = request.get_json()
    saved_pref = data['preferences']  # Access the saved allergies sent from JavaScript
    
    
    cur.execute('UPDATE userdata SET preferences = %s WHERE email = %s ', (saved_pref, email))
    
    # Prepare the response data
    response_data = {
        'message': 'Pref saved successfully'
    }
    mysql.connection.commit()
    cur.close()

        # Return the response as JSON
    return jsonify(response_data)


recipe_display = pd.read_csv("RAW_recipes.csv")

# Route to fetch random recipe names
@app.route("/fetchrecipenames", methods=["GET"])
def fetch_recipe_names():
    # Fetch random recipes
    recipe1 = recipe_display.sample(n=1).iloc[0]["name"]
    recipe2 = recipe_display.sample(n=1).iloc[0]["name"]
    recipe3 = recipe_display.sample(n=1).iloc[0]["name"]

    # Return the recipe names as a JSON response
    return jsonify({
        "recipe1": recipe1,
        "recipe2": recipe2,
        "recipe3": recipe3})
#------------------------------------------RATE A FEW RECIPES------------------------------------#

@app.route('/rate', methods=['GET', 'POST'])
def rate():
    
    return render_template('ratehomepg.html')

#-------------------------------RATE RECIPES---------------------------

# @app.route('/raterecipes', methods=['POST', 'GET'])
# def rate_recipes():
#     if request.method == 'POST':
#         ratings = request.get_json()
#         new_itrain = pd.read_csv(r"C:/Users/amrut/OneDrive/Desktop/miniproject2/interactions_train2.csv")
#         new_itest = pd.read_csv(r"C:/Users/amrut/OneDrive/Desktop/miniproject2/interactions_test2.csv")
#         print(ratings)
#         print(session['username'])

#         new_itest = new_itest.append({'user_id':session['username'], 'recipe_id': RECIPE_LIST1[1], 'rating': ratings['recipe1']}, ignore_index=True)
#         new_itest = new_itest.append({'user_id':session['username'], 'recipe_id': RECIPE_LIST2[1], 'rating': ratings['recipe2']}, ignore_index=True)
#         new_itest = new_itest.append({'user_id':session['username'], 'recipe_id': RECIPE_LIST3[1], 'rating': ratings['recipe3']}, ignore_index=True)

#         new_itest.to_csv('interactions_test2.csv', index=False)

#         new_itrain = new_itrain.append({'user_id':session['username'], 'recipe_id': RECIPE_LIST1[1], 'rating': ratings['recipe1']}, ignore_index=True)
#         new_itrain = new_itrain.append({'user_id':session['username'], 'recipe_id': RECIPE_LIST2[1], 'rating': ratings['recipe2']}, ignore_index=True)
#         new_itrain = new_itrain.append({'user_id':session['username'], 'recipe_id': RECIPE_LIST3[1], 'rating': ratings['recipe3']}, ignore_index=True)
        
#         new_itrain.to_csv('interactions_train2.csv', index=False)
        
#         return redirect('/home')
    
#     return render_template('newnew.html', recipes1=RECIPE_LIST1, recipes2=RECIPE_LIST2, recipes3=RECIPE_LIST3)

@app.route('/raterecipes', methods=['POST', 'GET'])
def rate_recipes():
    new_itrain = pd.read_csv("interactions_train2.csv")
    new_itest = pd.read_csv("interactions_test2.csv")

    df1 = recipe_display.sample()
    stringrecipe1 = (df1[['name']]).to_string(index=False, header=False)
    stringid1 = (df1[['id']]).to_string(index=False, header=False)
    RECIPE_LIST1 = [stringrecipe1, stringid1]

    df2 = recipe_display.sample()
    stringrecipe2 = (df2[['name']]).to_string(index=False, header=False)
    stringid2 = (df2[['id']]).to_string(index=False, header=False)
    RECIPE_LIST2 = [stringrecipe2, stringid2]

    df3 = recipe_display.sample()
    stringrecipe3 = (df3[['name']]).to_string(index=False, header=False)
    stringid3 = (df3[['id']]).to_string(index=False, header=False)
    RECIPE_LIST3 = [stringrecipe3, stringid3]

    if request.method == 'POST':
        ratings = request.get_json()
        print(ratings)
        print(session['username'])

        new_itest = pd.concat([new_itest, pd.DataFrame({'user_id': [session['username']],
                                                        'recipe_id': [RECIPE_LIST1[1]],
                                                        'rating': [ratings['recipe1']]})], ignore_index=True)
        new_itest = pd.concat([new_itest, pd.DataFrame({'user_id': [session['username']],
                                                        'recipe_id': [RECIPE_LIST2[1]],
                                                        'rating': [ratings['recipe2']]})], ignore_index=True)
        new_itest = pd.concat([new_itest, pd.DataFrame({'user_id': [session['username']],
                                                        'recipe_id': [RECIPE_LIST3[1]],
                                                        'rating': [ratings['recipe3']]})], ignore_index=True)

        new_itest.to_csv('interactions_test.csv', index=False)

        new_itrain = pd.concat([new_itrain, pd.DataFrame({'user_id': [session['username']],
                                                          'recipe_id': [RECIPE_LIST1[1]],
                                                          'rating': [ratings['recipe1']]})], ignore_index=True)
        new_itrain = pd.concat([new_itrain, pd.DataFrame({'user_id': [session['username']],
                                                          'recipe_id': [RECIPE_LIST2[1]],
                                                          'rating': [ratings['recipe2']]})], ignore_index=True)
        new_itrain = pd.concat([new_itrain, pd.DataFrame({'user_id': [session['username']],
                                                          'recipe_id': [RECIPE_LIST3[1]],
                                                          'rating': [ratings['recipe3']]})], ignore_index=True)

        new_itrain.to_csv('interactions_train.csv', index=False)

        return redirect('/home')

    return render_template('newnew.html', recipes1=RECIPE_LIST1, recipes2=RECIPE_LIST2, recipes3=RECIPE_LIST3)

@app.route('/recommendrecipes', methods = ['POST', 'GET'])
def recommend_recipes():
       
    return render_template('load.html'), {"Refresh": "1; url=/showrecipes"}

@app.route('/showrecipes', methods = ['POST', 'GET'])
def show():
    interaction_data = pd.read_csv("RAW_interactions.csv")
    recipe_data = pd.read_csv("RAW_recipes.csv")

    interaction_train = pd.read_csv("interactions_train2.csv")
    interaction_test = pd.read_csv("interactions_test2.csv")

    interaction_data = interaction_data.astype({'user_id': 'string', 'recipe_id':'string'})
    interaction_train = interaction_train.astype({'user_id': 'string', 'recipe_id':'string'})
    interaction_test = interaction_test.astype({'user_id': 'string', 'recipe_id':'string'})

    uniqueUserIds = interaction_data.user_id.unique()
    uniqueFoodIds = interaction_data.recipe_id.unique()

    class RankingModel(tf.keras.Model):

        def __init__(self):
            super().__init__()
            embedding_dimension = 32

            self.user_embeddings = tf.keras.Sequential([
                                        tf.keras.layers.experimental.preprocessing.StringLookup(
                                            vocabulary=uniqueUserIds, mask_token=None),
                                            # add addional embedding to account for unknow tokens
                                        tf.keras.layers.Embedding(len(uniqueUserIds)+1, embedding_dimension)
                                        ])

            self.product_embeddings = tf.keras.Sequential([
                                        tf.keras.layers.experimental.preprocessing.StringLookup(
                                            vocabulary=uniqueFoodIds, mask_token=None),
                                        # add addional embedding to account for unknow tokens
                                        tf.keras.layers.Embedding(len(uniqueFoodIds)+1, embedding_dimension)
                                        ])
            # Set up a retrieval task and evaluation metrics over the
            # entire dataset of candidates.
            self.ratings = tf.keras.Sequential([
                                tf.keras.layers.Dense(256, activation="relu"),
                                tf.keras.layers.Dense(64,  activation="relu"),
                                tf.keras.layers.Dense(1)
                                ])

        def call(self, userId, foodId):
            user_embeddings  = self.user_embeddings (userId)
            food_embeddings = self.product_embeddings(foodId)
            return self.ratings(tf.concat([user_embeddings, food_embeddings], axis=1))
        
    class FoodModel(tfrs.models.Model):

        def __init__(self):
            super().__init__()
            self.ranking_model: tf.keras.Model = RankingModel()
            self.task: tf.keras.layers.Layer   = tfrs.tasks.Ranking(
                                                        loss    =  tf.keras.losses.MeanSquaredError(),
                                                        metrics = [tf.keras.metrics.RootMeanSquaredError()])


        def compute_loss(self, features, training=False):
            rating_predictions = self.ranking_model(features["userID"], features["foodID"]  )

            return self.task( labels=features["rating"], predictions=rating_predictions)

    uniqueUserIds = interaction_data.user_id.unique()
    uniqueFoodIds = interaction_data.recipe_id.unique()

    random.shuffle(uniqueUserIds)

    train_data = tf.data.Dataset.from_tensor_slices(
    {
        "userID":tf.cast(interaction_train.user_id.values, tf.string),
        "foodID":tf.cast(interaction_train.recipe_id.values, tf.string),
        "rating":tf.cast(interaction_train.rating.values, tf.float32)
    })

    test_data = tf.data.Dataset.from_tensor_slices(
    {
        "userID":tf.cast(interaction_test.user_id.values, tf.string),
        "foodID":tf.cast(interaction_test.recipe_id.values, tf.string),
        "rating":tf.cast(interaction_test.rating.values, tf.float32)
    })

    tf.random.set_seed(42)

    train_data = train_data.shuffle(100_000, seed=42, reshuffle_each_iteration=False)

    model = FoodModel()
    model.compile(optimizer=tf.keras.optimizers.Adagrad(learning_rate=0.001))
    cached_train = train_data.shuffle(100_000).batch(8192).cache()
    cached_test = test_data.batch(4096).cache()
    model.fit(cached_train, epochs=10)

    model.evaluate(cached_test, return_dict=True)


    user_rand = session['username']
    test_rating = {}
    for m in test_data.take(10):
        test_rating[m["foodID"].numpy()] = RankingModel()(
        tf.convert_to_tensor([str(user_rand)]),
        tf.convert_to_tensor([str(m["foodID"].numpy().decode())])
    )
    
    
    RECIPE_LIST = []

    for m in sorted(test_rating, key=test_rating.get, reverse=True):
        RECIPE_LIST.append(recipe_data.loc[recipe_data['id'] == int(m.decode())]['name'].item())

    return render_template('showrecipes2.html', recipelist=RECIPE_LIST)

@app.route('/aboutus')
def aboutus():
    return render_template('aboutus.html', username=session['username'], email=session['email'])


recipes_df = pd.read_csv("RAW_recipes.csv")
@app.route('/recipe')
def recipe():
    recipe_name = request.args.get('name')  # Get the recipe name from the query parameters
    recipe_details = get_recipe_details(recipe_name)  # Get the recipe details based on the recipe name

    if recipe_details:
        return render_template('recipe.html', recipe_details=recipe_details)
    else:
        return render_template('not_found.html', recipe_name=recipe_name)

# Helper function to fetch recipe details
def get_recipe_details(recipe_name):
    recipe = recipes_df.loc[recipes_df['name'] == recipe_name]
    if not recipe.empty:
        recipe_details = {
            'name': recipe['name'].values[0],
            'ingredients': recipe['ingredients'].values[0].split(','),
            'steps': recipe['steps'].values[0].split('\n'),
            'image_url': get_recipe_image(recipe_name)  # Add image URL to the dictionary
        }
        return recipe_details
    else:
        return None
PEXELS_API_KEY = 'mx60v3BOk6ECvGbPPNIGkfck098NRh2VuIYDTMBSmUDEFVSxOCaixEAX'
# Helper function to fetch recipe image from Pexels
def get_recipe_image(recipe_name):
    search_query = f'{recipe_name} recipe'  # Append "recipe" to the search query for better results
    headers = {
        'Authorization': PEXELS_API_KEY
    }
    params = {
        'query': search_query,
        'per_page': 1  # Limit the search to retrieve only one image
    }
    url = 'https://api.pexels.com/v1/search'
    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data = response.json()
        if 'photos' in data and len(data['photos']) > 0:
            image_url = data['photos'][0]['src']['medium']  # Get the URL of the first image in the search results
            return image_url

    return None

if __name__ == '__main__':
    app.run(debug=True, port=5050)



#----------------------------------------------MODEL BEGIN---------------------------------------------------#






#----------------------------------------------MODEL END---------------------------------------------------#
