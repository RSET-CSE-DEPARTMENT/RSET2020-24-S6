# Import necessary libraries
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
import sqlite3

# Connect to the 'db1.db' SQLite database
conn = sqlite3.connect('db1.db')
cursor = conn.cursor()

# Initialize variables
a = 0
m = 1
x1 = 1
count1 = 0
table_name = 'college'

# Get the total number of rows in the 'college' table
cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
result = cursor.fetchone()
count = result[0]
count1 = int(count)

# Loop through each row in the 'college' table
for a in range(count1):
    print(x1)
    
    # Retrieve past rank and cutoff data for the current row
    cursor.execute("SELECT sno, y1, co1, y2, co2, y3, co3, y4, co4, y5, co5 FROM college WHERE sno = " + str(x1) + ";")
    data = cursor.fetchone()
    sno0, y01, co01, y02, co02, y03, co03, y04, co04, y05, co05 = data
    
    # Create an array of past rank and cutoff data
    past_ranks = np.array([[y01, co01], [y02, co02], [y03, co03], [y04, co04], [y05, co05]])
    
    # Set the target year for prediction
    target_year = 2023
    
    # Prepare the input data (past years' ranks)
    X = past_ranks[:, 0].reshape(-1, 1)
    
    # Prepare the target data (past years' cutoffs)
    y = past_ranks[:, 1]
    
    # Set the degree of the polynomial curve
    degree = 2
    
    # Generate polynomial features based on the specified degree
    poly_features = PolynomialFeatures(degree=degree)
    X_poly = poly_features.fit_transform(X)
    
    # Initialize a Linear Regression model
    model = LinearRegression()
    
    # Fit the model to the polynomial features
    model.fit(X_poly, y)
    
    # Transform the target year to polynomial features
    target_year_poly = poly_features.transform([[target_year]])
    
    # Make a predicted cutoff for the target year using the polynomial model
    predicted_rank = model.predict(target_year_poly)
    p = predicted_rank
    q = int(p)
    
    # Update the 'pr' (Polynomial Regression) column in the 'college' table with the predicted rank
    cursor.execute("UPDATE college SET pr = " + str(q) + " WHERE sno = " + str(x1) + ";")
    
    # Commit the changes to the database
    conn.commit()
    
    x1 = x1 + 1

# Close the database connection
conn.close()
print("Polynomial Regression Prediction Done")
