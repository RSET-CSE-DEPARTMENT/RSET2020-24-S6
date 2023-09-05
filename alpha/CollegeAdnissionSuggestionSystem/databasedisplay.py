# Import the SQLite library
import sqlite3

# Connect to the 'db1.db' SQLite database
conn = sqlite3.connect('db1.db')

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Execute a SELECT query to retrieve all rows from the 'college' table
cursor.execute('SELECT * FROM college')

# Loop through the results and print each row
for row in cursor:
    print(row)

# Close the database connection
conn.close()
