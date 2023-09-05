# Import the SQLite library
import sqlite3

# Connect to the 'db1.db' SQLite database
conn = sqlite3.connect('db1.db')

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Define the schema for the "college" table and create it if it doesn't exist
cursor.execute('''CREATE TABLE IF NOT EXISTS college (
                    sno INTEGER ,
                    ccode varchar(5),
                    cname varchar(300),
                    loc varchar(30),
                    coname varchar(300),
                    apg varchar(1),
                    hos varchar(3),
                    nirf INTEGER,
                    y1 INTEGER , 
                    co1 INTEGER,
                    y2 INTEGER, 
                    co2 INTEGER,
                    y3 INTEGER , 
                    co3 INTEGER,
                    y4 INTEGER , 
                    co4 INTEGER,
                    y5 INTEGER , 
                    co5 INTEGER,
                    lr INTEGER,
                    mlp INTEGER,
                    pr INTEGER,
                    rf INTEGER,
                    svr INTEGER,
                    link varchar(200)
                )''')

# Commit the changes to the database
conn.commit()

# Print a message indicating that the table has been created
print("Table Created")

# Close the database connection
conn.close()
