# Import necessary libraries
from flask import Flask, render_template, request, session
from sklearn.metrics import mean_absolute_error
import sqlite3

# Create a Flask application
app = Flask(__name__, static_folder='static')
app.secret_key = "babu"

# Default algorithm
default_algorithm = "lr"

# Available algorithms
algorithms = {
    "lr": "Linear Regression",
    "pr": "Polynomial Regression",
    "rf": "Random Forest",
    "svr": "Support Vector Regression"
}

# Route for the home page
@app.route('/')
def home():
    return render_template('input.html', algorithms=algorithms)

# Route for processing the form submission
@app.route('/process', methods=['POST'])
def process():
    # Get the input data from the form
    rank = request.form.get('keam-rank', '')
    course = request.form.get('course', '')
    location = request.form.get('location', '')

    # Store the input values in session variables
    session['rank'] = rank
    session['course'] = course
    session['location'] = location

    # Connect to the SQLite database
    conn = sqlite3.connect('db1.db')
    cursor = conn.cursor()

    # Select the appropriate cutoff column based on the default algorithm
    cutoff_column = default_algorithm

    # Execute a SQL query to fetch the colleges based on input values and cutoff column
    if location == 'All Kerala':
        query = f"SELECT cname, loc, coname, apg, hos FROM college WHERE {cutoff_column} >= ? AND coname = ?"
        cursor.execute(query, (rank, course))
    else:
        query = f"SELECT cname, loc, coname, apg, hos FROM college WHERE {cutoff_column} >= ? AND coname = ? AND loc = ?"
        cursor.execute(query, (rank, course, location))
    results = cursor.fetchall()

    # Extract the college data from the query results
    colleges = []
    for row in results:
        college = {
            'name': row[0],
            'location': row[1],
            'course': row[2],
            'category': row[3],
            'hostel': row[4]
        }
        colleges.append(college)

    # Perform model predictions and calculate metrics for available algorithms
    metrics = {}
    for algorithm in algorithms:
        # Similar SQL queries for each algorithm, fetching predicted and actual cutoffs
        # Calculate Mean Absolute Error (MAE) and accuracy

    # Close the database connection
    conn.close()

    # Pass the colleges data and default algorithm to the output page
    return render_template('output.html', colleges=colleges, algorithms=algorithms, metrics=metrics, selected_algorithm=default_algorithm)

# Route for training the model
@app.route('/train', methods=['POST'])
def train():
    global default_algorithm  # Add this line to access the global variable

    algorithm = request.form.get('algorithm', '')

    # Update the default algorithm based on user selection
    if algorithm:
        default_algorithm = algorithm

    # Get the input values from session variables
    rank = session.get('rank', '')
    course = session.get('course', '')
    location = session.get('location', '')

    # Connect to the SQLite database
    conn = sqlite3.connect('db1.db')
    cursor = conn.cursor()

    # Select the appropriate cutoff column based on the default algorithm
    cutoff_column = default_algorithm

    metrics = {}
    for algorithm in algorithms:
        # Similar SQL queries for each algorithm, fetching predicted and actual cutoffs
        # Calculate Mean Absolute Error (MAE) and accuracy

    # Similar SQL queries for college data fetching as in the '/process' route

    # Close the database connection
    conn.close()

    # Pass the colleges data and updated default algorithm to the output page
    return render_template('output.html', colleges=colleges, algorithms=algorithms, metrics=metrics, selected_algorithm=default_algorithm)

# Run the Flask application if this script is executed directly
if __name__ == '__main__':
    app.run(debug=True)
