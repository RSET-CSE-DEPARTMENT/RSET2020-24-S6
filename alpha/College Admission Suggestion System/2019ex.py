# Import necessary libraries
import csv
import sqlite3

# Connect to the 'db1.db' SQLite database
conn = sqlite3.connect('db1.db')
cursor = conn.cursor()

# SQL query to count the number of rows in the 'college' table
sql = "SELECT COUNT(*) FROM college"
cursor.execute(sql)
cou1 = cursor.fetchone()[0]
co = int(cou1)
print(cou1)

# Open and read the '2019.csv' file
with open('2019.csv', 'r') as file:
    reader = csv.reader(file)
    
    # Iterate through each row in the CSV file
    for row in reader:
        col1 = row[0]  # Get the value of the first column
        col2 = row[1]  # Get the value of the second column
        col3 = row[2]  # Get the value of the third column
        col4 = row[3]  # Get the value of the fourth column
        col5 = row[4]  # Get the value of the fifth column
        print(col1, col2, col3, col4, col5)
        
        # SQL query to count rows with specific conditions in the 'college' table
        sql = "SELECT COUNT(*) FROM college WHERE ccode=? AND coname=?"
        cursor.execute(sql, (col1, col5))
        cou = cursor.fetchone()[0]
        co1 = int(cou)
        
        # Check if a row with the same 'ccode' and 'coname' exists in the 'college' table
        if co1 != 0: 
            # If a matching row exists, update the 'y1', 'y2', 'y3', 'y4', 'y5', and 'co3' columns
            sql = "UPDATE college SET y1=?,y2=?,y3=?,y4=?,y5=?,co3=? WHERE ccode=? AND coname=?"
            cursor.execute(sql, (2017, 2018, 2019, 2021, 2022, col4, col1, col5))
            print("Updated.")
            conn.commit()
        else:
            # If no matching row exists, insert a new row with the specified values
            co = co + 1  # Increment the 'sno' value
            insert_query = "INSERT INTO college (sno, ccode, cname, loc, coname, co3, y1, y2, y3, y4, y5) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
            cursor.execute(insert_query, (co, col1, col2, col3, col5, col4, 2017, 2018, 2019, 2021, 2022))
            print("New row inserted successfully.")
            conn.commit()

# Commit changes to the database and close the connection
conn.commit()
conn.close()
print("2019 extraction done.")
