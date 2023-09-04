import selenium
import pandas as pd
import time
from selenium import webdriver
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import warnings
warnings.filterwarnings('ignore')
from selenium.webdriver.common.by import By
import re
import requests
from datetime import *
from bs4 import BeautifulSoup
# Create a web driver
driver = webdriver.Chrome(r"C:\\Users\\hp\Downloads\\chromedriver.exe")
# Open the Indian Railway website
driver.get("https://www.railyatri.in/live-train-status")
#searching for required  tarin no  in search bar
search_no = driver.find_element(By.XPATH,'//input[@id="train_running_status"]')
search_no.send_keys("16307")
# Click on the submit button
submit = driver.find_element(By.XPATH,'//button[@type="submit"]')
submit.click()
# Wait for the results to load
driver.implicitly_wait(10)
trainlink=driver.current_url
driver.close()