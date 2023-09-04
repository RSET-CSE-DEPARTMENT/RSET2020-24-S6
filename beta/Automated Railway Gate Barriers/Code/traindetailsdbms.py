from selenium import webdriver
import sqlite3
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
import selenium
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException, TimeoutException
import traincodeextract as tc
# Set up Selenium options
options = Options()
capa = DesiredCapabilities.CHROME
capa["pageLoadStrategy"] = "none"
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
options.headless = True  # Run the browser in headless mode,slower
# Set up the Selenium driver (Replace the path with your own chromedriver path)
driver_path = 'C:\\Users\\hp\\Downloads\\chromedriver.exe'
service = Service(driver_path)
driver = webdriver.Chrome(service=service, options=options,desired_capabilities=capa)
wait = WebDriverWait(driver,20)
# Connect to the database
conn = sqlite3.connect('C:\\Users\\hp\\Train.db')  # Replace with the path to your database file
# Create a cursor
cursor = conn.cursor()
def scrape_details(train_number,firststat,driver,cursor,conn,wait):
    # Load the webpage
    url = f"https://www.railyatri.in/live-train-status/{train_number}"
    driver.get(url)
    try:
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'table-responsive')))
        driver.execute_script("window.stop();")
    except(TimeoutException):
        print("ERROR DETECTED")
        return -1
    else:      
    # Always drop existing tables if any
    # Create a table if it doesn't exist
        cursor.execute('''CREATE TABLE IF NOT EXISTS details (
                            Traincode TEXT,
                            Station TEXT,
                            Arrival TEXT,
                            [Train Status] TEXT,
                            [Halt Time] TEXT,
                            Platform TEXT,
                            [Locomotive Reverse] TEXT
                        )''')
        # Find the parent element containing the table
        parent_element = driver.find_element("class name", "table-responsive")
        # Find all the table rows within the parent element
        rows = parent_element.find_elements("tag name", "tr")
        # Iterate over the rows to extract and insert the details
        for row in rows:
        # Find the columns within the row
            columns = row.find_elements("tag name", "td")
            if len(columns) >= 6:
            # Retrieve the text of each column
                station = columns[0].text
                arrival = columns[1].text
                status = columns[2].text
                halt_time = columns[3].text
                platform = columns[4].text
                loco_reverse = columns[5].text
                str1=(firststat.upper())[1:]
                str2=station.upper()             
                if(str1 in str2):
                    # Insert the detail into the database
                    cursor.execute("INSERT INTO details (Traincode,Station, Arrival, [Train Status], [Halt Time], Platform, [Locomotive Reverse]) VALUES (?, ?, ?, ?, ?, ?, ?)", (train_number, station, arrival, status, halt_time, platform, loco_reverse))
                    conn.commit()
                    return 1
        # Commit the transaction
        # Close the cursor and connection    
tcodes=tc.traincode('AWY','TRTR')
testc=10
print(tcodes)
#modify testcaccording to no of train values needed
for i in tcodes:
    if(testc==0):
        break
    else:
        status=0
        while(status!=1):
            chances=5
            status=scrape_details(i,tcodes[i],driver=driver,cursor=cursor,conn=conn,wait=wait)
            if(status!=1):
                chances=chances-1
            if(chances==0):
                break    
        testc-=1    
cursor.close()
conn.close()        
# Quit the browser     
