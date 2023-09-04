from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium import webdriver
import selenium
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import warnings
def getstationcode(stat1,stat2):
    warnings.filterwarnings('ignore')
    capa = DesiredCapabilities.CHROME
    capa["pageLoadStrategy"] = "none"
    options = Options()
    options.headless = False  # Create a web driver
    driver = webdriver.Chrome(r"C:\\Users\\hp\Downloads\\chromedriver.exe",options=options,desired_capabilities=capa) # Open the Indian Railway website
    wait = WebDriverWait(driver, 20)
    driver.get("https://www.railyatri.in/trains-between-stations")  #searching for required  tarin no  in search bar
    wait.until(EC.presence_of_element_located((By.XPATH, '//input[@id="form-stn"]')))
    driver.execute_script("window.stop();")
    search_no = driver.find_element(By.XPATH,'//input[@id="form-stn"]')     #searching for input field
    search_no.send_keys(stat1)  #sending keys
    WebDriverWait(driver,10).until(EC.element_to_be_clickable((By.XPATH,'/html/body/ul[1]/li[1]'))).click() #selecting first option
    search_no = driver.find_element(By.XPATH,'//input[@id="to-stn"]')
    search_no.send_keys(stat2)
    driver.implicitly_wait(3)
    elements2=driver.find_elements(By.XPATH,"//ul[@id='ui-id-2']//li")
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH,'/html/body/ul[2]/li[1]'))).click()
    WebDriverWait(driver,1).until(EC.element_to_be_clickable((By.XPATH,'/html/body/div[3]/div/div[1]/div/div[2]/div/div/div[1]/form/div[4]/input'))).click()
    #click submit
    return driver.current_url      