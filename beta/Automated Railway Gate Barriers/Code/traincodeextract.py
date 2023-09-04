from datetime import *
import requests
import re
from bs4 import BeautifulSoup
import stationnameextract as se
def traincode(from_code,to_code):
    currdate=datetime.now()
    currdate=currdate.strftime("%d-%m-%Y")
    yourl=se.getstationcode(from_code,to_code)
    r=requests.get(yourl)
    datas=BeautifulSoup(r.content,'html5lib')##parsing the data
    ronya=datas.find('div',class_='col-xs-12 ReservedTrain_Seprator sperator_block')#removing alternate trains
    for e in ronya.find_all_next():
        e.clear()
    tcodes=datas.find_all('div',class_='namePart')
    tstations=datas.find_all('div',class_='DepTime')
    tdeptimes=datas.find_all('div',class_='DepTime')
    deets={}
    stationnames=[]
    times=[]
    nametime=[]
    total=0
    index=0
    for i in tdeptimes:
        inter=i.find('p',class_='Departure-time Departure-time-text-1')
        inter.span.decompose()
        times.append(inter.text)
    for i in tstations:
        inter=i.find('p',class_="ellipsis Departure-time Departure-time-text-2")
        stationnames.append(inter.text)
        total+=1
    for i in tcodes:
        inter=i.find('p').getText()
        unwanted=inter.split()
        nametime.append(stationnames[index])
        nametime.append(times[index])
        deets[unwanted[0]]=nametime
        nametime=[]
        index+=1    
    yourl=se.getstationcode(to_code,from_code)
    r=requests.get(yourl)
    datas=BeautifulSoup(r.content,'html5lib')##parsing the data
    ronya=datas.find('div',class_='col-xs-12 ReservedTrain_Seprator sperator_block')#removing alternate trains
    for e in ronya.find_all_next():
        e.clear()
    tcodes=datas.find_all('div',class_='namePart')
    tstations=datas.find_all('div',class_='DepTime')
    tdeptimes=datas.find_all('div',class_='DepTime')
    stationnames=[]
    times=[]
    nametime=[]
    total=0
    index=0
    for i in tdeptimes:
        inter=i.find('p',class_='Departure-time Departure-time-text-1')
        inter.span.decompose()
        times.append(inter.text)
    for i in tstations:
        inter=i.find('p',class_="ellipsis Departure-time Departure-time-text-2")
        stationnames.append(inter.text)
        total+=1
    for i in tcodes:
        inter=i.find('p').getText()
        unwanted=inter.split()
        nametime.append(stationnames[index])
        nametime.append(times[index])
        deets[unwanted[0]]=nametime
        nametime=[]
        index+=1    
    return deets
print(traincode('TRTR','AWY'))
