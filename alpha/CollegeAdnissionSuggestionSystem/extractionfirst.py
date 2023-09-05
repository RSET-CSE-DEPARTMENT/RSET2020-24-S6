# Import necessary libraries
import csv
import sqlite3

# Open the CSV file 'main1.csv' in read mode
with open('main1.csv', 'r') as file:
   
    # Create a CSV reader object
    reader = csv.reader(file)

    # Establish a connection to the SQLite database 'db1.db' and create a cursor object
    conn = sqlite3.connect('db1.db')
    cursor = conn.cursor()

    # Initialize serial number 'sno1' and a variable 'x1'
    sno1 = 1
    x1 = 0

    # Iterate over each row in the CSV file
    for row in reader:
        
        # Print the current value of 'x1' (possibly for debugging or tracking progress)
        print(x1)
        
        # Extract data from different columns of the CSV file
        col1 = row[0]
        col2 = row[1]
        col3 = row[2]
        col4 = row[3]
        col5 = row[4]
        col6 = row[5]
        col7 = row[6]

        # Define an SQL INSERT query with placeholders to insert data into the 'college' table
        sql = "INSERT OR REPLACE INTO college (sno, ccode, cname ,loc,coname, nirf,hos,apg,co1,co2,co3,co4,co5,y1,y2,y3,y4,y5) VALUES ( ?,?,?,?,?,?, ?, ?,?, ?, ?, ?, ?,?,?,?,?,?)"
        
        # Execute the SQL query, filling placeholders with data
        cursor.execute(sql, (sno1, col1, col2, col3, col4, col5, col6, col7, 0, 0, 0, 0, 0, 2017, 2018, 2019, 2021, 2022))
        
        # Increment the serial number 'sno1'
        sno1 = sno1 + 1
        
        # Commit the changes to the database
        conn.commit()
        
        # Increment the 'x1' variable
        x1 = x1 + 1
    
    # Close the database connection
    conn.close()

# Print a message indicating that the main extraction is done
print("Main extraction done.")
