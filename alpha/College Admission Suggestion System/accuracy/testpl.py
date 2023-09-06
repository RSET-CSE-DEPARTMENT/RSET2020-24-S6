# Import necessary libraries
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
import sqlite3

# Connect to the 'db2.db' SQLite database
conn = sqlite3.connect('db2.db')
cursor = conn.cursor()

# Initialize variables
x1 = 1
count1 = cursor.execute(f"SELECT COUNT(*) FROM college").fetchone()[0]

actual_ranks = []  # List to store actual ranks
predicted_ranks = []  # List to store predicted ranks

# Loop through each row in the 'college' table
for a in range(count1):
    cursor.execute(f"SELECT sno, y1, co1, y2, co2, y3, co3, y4, co4, y5, co5 FROM college WHERE sno = {x1}")
    data = cursor.fetchone()
    sno0, y01, co01, y02, co02, y03, co03, y04, co04, y05, co05 = data
    past_ranks = np.array([[y01, co01], [y02, co02], [y03, co03], [y04, co04]])
    target_year = 2022
    X = past_ranks[:, 0].reshape(-1, 1)
    y = past_ranks[:, 1]
    degree = 2
    poly_features = PolynomialFeatures(degree=degree)
    X_poly = poly_features.fit_transform(X)
    
    # Initialize a Linear Regression model
    model = LinearRegression()
    
    # Fit the Polynomial Regression model to the data
    model.fit(X_poly, y)
    
    # Transform the target year for prediction
    target_year_poly = poly_features.transform([[target_year]])
    
    # Make a predicted rank using the Polynomial Regression model
    predicted_rank = model.predict(target_year_poly)
    predicted_ranks.append(int(predicted_rank))
    
    # Assuming co05 contains the actual rank, add it to the 'actual_ranks' list
    actual_ranks.append(co05)
    
    x1 += 1

# Calculate Mean Absolute Error (MAE) between actual and predicted ranks
mae = mean_absolute_error(actual_ranks, predicted_ranks)

# Calculate accuracy as a ratio
accuracy = 1 - (mae / max(actual_ranks))

# Convert accuracy to a percentage
accuracy_percent = accuracy * 100

# Print the accuracy percentage
print("Accuracy: {:.2f}%".format(accuracy_percent))
