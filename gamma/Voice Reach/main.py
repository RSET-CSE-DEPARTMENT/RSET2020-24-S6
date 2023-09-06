import speech_recognition as sr
import pyttsx3
import smtplib
from email.message import EmailMessage
from email.header import decode_header
import imaplib
import email
import sqlite3

conn = sqlite3.connect('Activities.db')
c=conn.cursor()

#c.execute("""CREATE TABLE Activities (
#           act text,
#           name text,
#           sub text
#          )""")


listener = sr.Recognizer()
tts = pyttsx3.Engine()

WAKE_WORD = "hello echo";


def echo(text):
    tts.say(text)
    tts.runAndWait()


def mic(max_attempts=3):
    attempts = 0
    while attempts < max_attempts:
        with sr.Microphone() as source:
            print("Program is listening...")

            #listener.adjust_for_ambient_noise(source, duration=0.3)

            voice = listener.listen(source)

            try:
                #voice = listener.listen(source, timeout=3)
                data = listener.recognize_google(voice, language='en')
                return data.lower()
            except sr.UnknownValueError:
                echo("Unable to recognize speech..please say again")
                attempts += 1
            except sr.RequestError:
                print("Request to Google Speech Recognition service failed")
                attempts += 1

    echo("Maximum number of attempts reached. Exiting...")
    return None


dict = {"name1": "email1", "name2": "email2"}


def send_mail(receiver, subject, body):
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login("email-id", "password")
    # server.sendmail("grouppro856@gmail.com","shikhamariamjoseph@gmail.com",data)
    email = EmailMessage()
    email["From"] = "grouppro856@gmail.com"
    email["To"] = receiver
    email["Subject"] = subject
    email.set_content(body)
    server.send_message(email)


def compose():
    echo("To whom do you want to send this mail?")
    name = mic()
    print(name)
    # receiver=dict[name]
    if name not in dict:
        echo("say the gmail id of the person")
        val = mic()
        print(val)
        dict[name] = val;
    receiver = dict[name]
    echo("speak the subject of the email")
    subject = mic()
    print(subject)
    echo("speak the body of this email")
    body = mic()
    print(body)
    echo(f"Do you confirm that you want to sent the mail to {name},subject {subject} and body {body}")
    ans=mic()
    print(ans)
    if ans=="no":
        return
    send_mail(receiver, subject, body)
    echo("your email has been sent!.")
    c.execute("INSERT INTO Activities (act, name,sub) VALUES (?, ?,?)", ("send mail", receiver,subject))
    conn.commit()
def read():
    print("Im read function")
    imap_server = "imap.gmail.com"
    email_address = "email-id"
    password = "password"
    imap = imaplib.IMAP4_SSL(imap_server)
    imap.login(email_address, password)
    imap.select('Inbox')
    _, msgnums = imap.search(None,"UNSEEN")
    for msgnum in msgnums[0].split():
        _, data = imap.fetch(msgnum,"(RFC822)")
        message=email.message_from_bytes(data[0][1])
        #print(f"Message Number:{msgnum}")
        echo(f"From:{message.get('From')}")
        echo(f"To:{message.get('To')}")
        echo(f"BCC:{message.get('BCC')}")
        echo(f"Date:{message.get('Date')}")
        echo(f"Subject:{message.get('Subject')}")
        echo("Content:")
        for part in message.walk():
            if part.get_content_type()=="text/plain":
                echo(part.as_string())
    imap.close()

def delete():
    echo("Whose message would you like to delete?")
    name=mic()
    print(name)
    echo(f"Do you confirm that you want to delete messages from {name}")
    ans=mic()
    if ans =="no":
        return
    emailid = dict[name]

     # account credentials
    username = "email-id"
    password = "password"

    # create an IMAP4 class with SSL
    imap = imaplib.IMAP4_SSL("imap.gmail.com")
    # authenticate
    imap.login(username, password)
    # select the mailbox I want to delete in
    # if you want SPAM, use imap.select("SPAM") instead
    imap.select("INBOX")
    # search for specific mails by sender
    status, messages = imap.search(None,  f'From {emailid}')
    # convert messages to a list of email IDs
    messages = messages[0].split(b' ')
    for mail in messages:
        _, msg = imap.fetch(mail, "(RFC822)")
        # you can delete the for loop for performance if you have a long list of emails
        # because it is only for printing the SUBJECT of target email to delete
        for response in msg:
            if isinstance(response, tuple):
                msg = email.message_from_bytes(response[1])
                # decode the email subject
                subject = decode_header(msg["Subject"])[0][0]
                if isinstance(subject, bytes):
                    # if it's a bytes type, decode to str
                    subject = subject.decode()
                print("Deleting", subject)
                echo(f'deleting email from {name} where subject is {subject}')
        # mark the mail as deleted
        imap.store(mail, "+FLAGS", "\\Deleted")
    # permanently remove mails that are marked as deleted
    # from the selected mailbox (in this case, INBOX)
    imap.expunge()
    # close the mailbox
    imap.close()
    # logout from the account
    imap.logout()
    c.execute("INSERT INTO Activities (act, name,sub) VALUES (?, ?,?)", ("delete", emailid, subject))
    conn.commit()
def maincode():
    echo("Please say the wake word to activate the voice assistant")
    word = mic()
    print(word)
    if word.startswith(WAKE_WORD):
        echo(
            "Welcome to voice reach, I am echo. I can help you with, 1,Composing mails 2,Reading your Inbox. 3,Deleting your emails.")
        while True:
            echo("What would you like to do send mails ,or read your inbox, or delete, or stop ?")
            ans = mic()
            print(ans)
            if ans is not None:

                if "send" == ans:
                    print("send")
                    compose()
                    # continue
                elif "read inbox" in ans:
                    print("read")
                    read()
                    # continue
                elif "delete" == ans:
                    #print("delete")
                    delete()
                    # continue
                elif "stop" == ans:
                    echo("ok bye,see you next time")
                    print("stop")
                    break
        exit()

    else:
        echo("Incorrect wake word")
        exit()
    c.execute("select * from Activities")
    print(c.fetchall())
    conn.close()
maincode()
