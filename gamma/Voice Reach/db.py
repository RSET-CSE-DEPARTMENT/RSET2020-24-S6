import sqlite3

def view_table():
    conn=sqlite3.connect('Activities.db')
    c=conn.cursor()
    c.execute("select * from Activities")
    rows=c.fetchall()
    for row in rows:
        print(row)
    conn.close()

if __name__=='__main__':
    view_table()