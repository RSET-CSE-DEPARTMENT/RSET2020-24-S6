# Import the SQLite library
import sqlite3

# Function to calculate the average of non-zero numbers in a list
def calcave(numbers):
    non_zero_numbers = [num for num in numbers if num != 0]
    
    if not non_zero_numbers:
        return None 
    
    total = sum(non_zero_numbers)
    average = total / len(non_zero_numbers)
    ave = int(average)
    return int(ave)

# Connect to the 'db1.db' SQLite database
conn = sqlite3.connect('db1.db')
cursor = conn.cursor()

# Initialize variables
x1 = 1  # Counter for iterating through rows
count1 = 0  # Total count of rows in the 'college' table
co11 = 0
co22 = 0
co33 = 0
co44 = 0
co55 = 0

# Specify the table name
table_name = 'college'

# Get the total count of rows in the 'college' table
cursor.execute("SELECT COUNT(*) FROM college")
result = cursor.fetchone()
count = result[0]
count1 = int(count)

# Loop through each row in the 'college' table
for a in range(count1):
    print(x1)
    avg1 = 0
    avg = 0
    
    # Fetch the data for the current row
    cursor.execute("SELECT sno, co1, co2, co3, co4, co5 FROM college where sno = " + str(x1) + ";")
    data = cursor.fetchone()
    sno0, co01, co02, co03, co04, co05 = data
    
    # Create a list of cutoff values
    cutoff_list = [co01, co02, co03, co04, co05]
    total_cutoff = co01 + co02 + co03 + co04 + co05
    
    # Calculate the average for non-zero cutoff values
    if total_cutoff > 0:
        avg1 = calcave(cutoff_list)
        av = str(avg1)
        print(av)
        
        # Update columns with zero cutoff values if they are zero
        if co01 == 0:
            cursor.execute("UPDATE college SET co1 = " + av + " WHERE sno = " + str(x1) + ";")
            conn.commit()
        if co02 == 0:
            cursor.execute("UPDATE college SET co2 = " + av + " WHERE sno = " + str(x1) + ";")
            conn.commit()
        if co03 == 0:
            cursor.execute("UPDATE college SET co3 = " + av + " WHERE sno = " + str(x1) + ";")
            conn.commit()
        if co04 == 0:
            cursor.execute("UPDATE college SET co4 = " + av + " WHERE sno = " + str(x1) + ";")
            conn.commit()
        if co05 == 0:
            cursor.execute("UPDATE college SET co5 = " + av + " WHERE sno = " + str(x1) + ";")
            conn.commit()
    
    x1 = x1 + 1

# Commit changes to the database
conn.commit()
print("Beautified")
