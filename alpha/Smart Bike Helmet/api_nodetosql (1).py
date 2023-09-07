import requests
import time
import mysql.connector
import twilio
from twilio.rest import Client

account_sid = "INSERT ACCOUNT SID HERE"
auth_token = "INSERT AUTHENTICATION TOKEN HERE"
url = 'https://discover.search.hereapi.com/v1/discover?at='+peices[1]+','+peices[2]+'&q=hospital&apikey=INSERT API KEY &limit=INSERT NO. OF HOSPITALS TO BE DISPLAYED'
strl=''
strh=''
item2=''
peices=[]

# MySQL database configuration
mysql_config = {    
    "host": "localhost",
    "user": "root",
    "password": "1234",
    "database": "project"
}

# NodeMCU IP address and port
nodemcu_ip = "192.168.208.149"
nodemcu_port = 80

# Get data from NodeMCU
def get_data_from_nodemcu():
    url = f"http://{nodemcu_ip}:{nodemcu_port}/data"  # Replace with your NodeMCU data endpoint
    response = requests.get(url)
    if response.status_code == 200:
        data1 = response.json()
        print(data1)
        return data1
        
    else:
        print("Error retrieving data from NodeMCU:", response.status_code)
        return None

# Post data to MySQL
def post_data_to_mysql(data1):
    peices = data1["crash_data"].split("\t")
    print(peices)

    try:
        connection = mysql.connector.connect(**mysql_config)
        cursor = connection.cursor()

        # Modify the query below according to your MySQL table structure
        query = "INSERT INTO crash_data (Magnitude, Latitude, Longitude, Emergency_Contact, Timestamp) VALUES (%s, %s, %s, %s, %s)"
        values = (peices[0], peices[1], peices[2], peices[3], peices[4])
        cursor.execute(query, values)
        connection.commit()

        print("Data posted to MySQL successfully.")

    except mysql.connector.Error as error:
        print("Error posting data to MySQL:", error)

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
        return(peices)

def api(arr):
    response = requests.get(url)
    client = Client(account_sid, auth_token)
    strh = 'Accident detected at '+'https://www.google.com/maps/search/?api=1&query='+arr[1]+','+arr[2]+'  '
    if response.status_code == 200: #successful http req
                data = response.json()
                filtered_titles = [item['title'] for item in data['items']]
                print(filtered_titles)
                for item in filtered_titles:
                    item2=item.replace(" ","")
                    strh += item+' '+'https://www.google.com/search?q='+item2+', '

    strh_final=strh[:-2]
    print(strh)
    call = client.calls.create(
                url='http://demo.twilio.com/docs/voice.xml',
                to='+'+arr[3],
                from_='+15738594232'
                )

    print(call.sid)
    message = client.messages.create(
                    body=strh_final,  # SMS content
                    to='+'+arr[3],
                    from_='+15738594232'
                    )
    if message.sid:
                print('SMS sent successfully!')
    else:
                print('Failed to send SMS.')


# Main program
if __name__ == '__main__':
    
    while True:
        
        
        data = get_data_from_nodemcu()
        
        if data:
           
            a = post_data_to_mysql(data)
            #print(a)
            api(a)
        else:
            print("Failed to retrieve data from NodeMCU.")

        #time.sleep(2)  # Pause execution for 2 seconds