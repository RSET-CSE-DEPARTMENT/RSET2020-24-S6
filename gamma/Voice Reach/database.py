import sqlite3

def view_table_content():
   conn = sqlite3.connect('users.db')
   c = conn.cursor()
   c.execute("SELECT * FROM users")
   rows = c.fetchall()
   for row in rows:
       print(row)
   conn.close()

if __name__ == '__main__':
   view_table_content()
