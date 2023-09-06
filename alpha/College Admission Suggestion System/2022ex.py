import csv
import sqlite3
conn = sqlite3.connect('db1.db')
cursor = conn.cursor()

sql = "select count(*) from college"
cursor.execute(sql)
cou1= cursor.fetchone()[0]
co=int(cou1)
print(cou1)
with open('2022.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
      col1 = row[0]
      col2 = row[1]
      col3 = row[2]
      col4 = row[3]
      col5 = row[4]
      print(col1,col2,col3,col4,col5)
      sql = "select count(*) from college where ccode=? AND coname=?"
      cursor.execute(sql, (col1, col5))
      cou= cursor.fetchone()[0]
      co1=int(cou)
      if co1 != 0: 
       sql = "UPDATE college SET y1=?,y2=?,y3=? ,y4=?, y5=?, co5 = ? WHERE ccode = ? AND coname = ?"
       cursor.execute(sql, (2017,2018,2019,2021,2022, col4, col1, col5))
       print("Updated.")
       conn.commit()
      else:
       co= co+1
       insert_query = "INSERT INTO college (sno , ccode, cname , loc , coname ,  co5 ,y1,y2,y3,y4,y5) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
       cursor.execute(insert_query, (co, col1, col2, col3 , col5 , col4,2017,2018,2019,2021,2022))
       print("New row inserted successfully.")
       conn.commit()
    
    conn.commit()
    conn.close()
print("2022 extraction done.")