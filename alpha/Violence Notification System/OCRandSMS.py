import pytesseract
import cv2
from twilio.rest import Client
import sqlite3

def detect_violence_in_video(video_path):
    # Set up Tesseract OCR
    pytesseract.pytesseract.tesseract_cmd = r"C:\Tesseract-OCR\tesseract.exe"

    # Twilio credentials
    account_sid = ''
    auth_token = ' '
    twilio_phone_number = ''
    destination_phone_number = ''

    # perform ocr
    def perform_ocr(image):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        text = pytesseract.image_to_string(gray)
        return text

    # roi
    roi_left = 0
    roi_top = 0
    roi_width = 850
    roi_height = 200

    # Open the video file
    video = cv2.VideoCapture(video_path)

    # Variables for violence detection
    violence_detected = False
    violence_count = 0

    # Twilio client
    client = Client(account_sid, auth_token)

    # Connect to the SQLite database
    conn = sqlite3.connect('violence.db')
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS violence (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            videoname TEXT,
            detection_time TEXT,
            person_called TEXT
        )
    ''')

    cursor.execute('''
        INSERT INTO violence (videoname, person_called)
        VALUES (?, ?)
    ''', (video_path, 'Abel'))

    # Main loop
    while video.isOpened():
        ret, frame = video.read()
        
        if not ret:
            break

        roi = frame[roi_top:roi_top+roi_height, roi_left:roi_left+roi_width]

        captured_text = perform_ocr(roi)

        if "violence" in captured_text.lower():
            violence_detected = True
            violence_count += 1
            if violence_count >= 4:
                timestamp = video.get(cv2.CAP_PROP_POS_MSEC) / 1000  # Convert milliseconds to seconds
                message_body = f"Violence Detected in {video_path} at timestamp {timestamp:.2f} seconds!"
                message = client.messages.create(
                    from_=twilio_phone_number,
                    body=message_body,
                    to=destination_phone_number
                )
                print("SMS sent:", message.sid)

                cursor.execute('''
                    INSERT INTO violence (videoname, detection_time, person_called)
                    VALUES (?, ?, ?)
                ''', (video_path, timestamp, 'Abel'))

                violence_count = 0
        else:
            violence_detected = False
            violence_count = 0

        

    conn.commit()
    conn.close()

    video.release()
    #cv2.destroyAllWindows()


