
import os
import math
import random
import smtplib

def forpass(emailid):
    digits = "0123456789"
    OTP = ""
    for i in range(6):
        OTP += digits[math.floor(random.random() * 10)]
    email1 = emailid.replace(",", ".")
    otp = OTP + " is your OTP"
    print(email1)
    msg = otp
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("harikrishnan.r.ofcl@gmail.com", "yrsbazkalavxokdx")
    s.sendmail('&&&&&&&&&&&', email1, msg)
    return OTP
    # if a == OTP:
    #     return True
    # else:
    #     return False