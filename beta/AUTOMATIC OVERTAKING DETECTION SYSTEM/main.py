import threading
from time import sleep
import os
import numpy
from pyrebase import pyrebase
from ultralytics import YOLO
import cv2
import cvzone
import math
from sort import *
from datetime import datetime
import page2
import tensorflow as tf
import _thread
def call1(id,crop):
    thr=threading.Thread(target=page2.no_reading,args=(id,crop))
    thr.start()
    thr.join()
def main():
    cap = cv2.VideoCapture("video1.mp4")  # For Video
    model = YOLO("/Yolo-Weights/yolov8l.pt")
    config = {
        "apiKey": "AIzaSyCQ2jsvICouZs7m7TA27a2u0MIRiLEKFZE",
        "authDomain": "aods-668cc.firebaseapp.com",
        "database": "https://aods-668cc-default-rtdb.firebaseio.com",
        "projectId": "aods-668cc",
        "storageBucket": "aods-668cc.appspot.com",
        "messagingSenderId": "34841860662",
        "appId": "1:34841860662:web:bcfce82f0319dd1208d697",
        "measurementId": "G-SNMQQ84LS2",
        "databaseURL": "https://aods-668cc-default-rtdb.firebaseio.com",
        "serviceAccount": "aods-668cc-firebase-adminsdk-r20v3-238f70f53a.json"
    }
    # firebase = pyrebase.initialize_app(config)
    # database = firebase.database()
    def rgb(event, x, y, flags, param):
        if event == cv2.EVENT_MOUSEMOVE:
            colorsBGR = [x, y]
            print(colorsBGR)
    cv2.namedWindow('Image')
    cv2.setMouseCallback('Image', rgb)
    def imgwrite(img):
        now = datetime.now()
        current_time = now.strftime("%d_%m_%Y_%H_%M_%S")
        filename = '%s.png' % current_time
        cv2.imwrite(os.path.join(r"C:\Users\Harikrishnan\PycharmProjects\mini_project\pythonProject\img", filename), img)
    classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
                  "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
                  "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
                  "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
                  "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
                  "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
                  "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
                  "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
                  "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
                  "teddy bear", "hair drier", "toothbrush"
                  ]
    mask = cv2.imread("mask1.png")
    # Tracking
    tracker = Sort(max_age=20, min_hits=3, iou_threshold=0.3)
    limits = [320, 650, 1373, 650]
    totalCount = []
    area = [(580, 831), (630, 830), (1000, 65), (978, 65)]
    area1 = [(1098, 829), (1177, 831), (1147, 89), (1126, 89)]
    area_c = []
    while True:
        success, img = cap.read()
        # Login.App().mainloop()
        # Login.App.getFrame(img)
        if not success:
            video = cv2.VideoCapture("video1.mp4")
            continue
        imgRegion = cv2.bitwise_and(img, mask)
        # imgGraphics = cv2.imread("graphics.png", cv2.IMREAD_UNCHANGED)
        # img = cvzone.overlayPNG(img, imgGraphics, (0, 0))
        results = model(imgRegion, stream=True)
        detections = np.empty((0, 5))
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Bounding Box
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                # cv2.rectangle(img,(x1,y1),(x2,y2),(255,0,255),3)
                w, h = x2 - x1, y2 - y1
                # Confidence
                conf = math.ceil((box.conf[0] * 100)) / 100
                # Class Name
                cls = int(box.cls[0])
                currentClass = classNames[cls]
                if currentClass == "car" or currentClass == "truck" or currentClass == "bus" \
                        or currentClass == "motorbike" and conf > 0.3:
                    # cvzone.putTextRect(img, f'{currentClass} {conf}', (max(0, x1), max(35, y1)),
                    #                    scale=0.6, thickness=1, offset=3)
                    # cvzone.cornerRect(img, (x1, y1, w, h), l=9, rt=5)
                    currentArray = np.array([x1, y1, x2, y2, conf])
                    detections = np.vstack((detections, currentArray))
        resultsTracker = tracker.update(detections)
        # cv2.line(img, (limits[0], limits[1]), (limits[2], limits[3]), (0, 0, 255), 5)
        for result in resultsTracker:
            x1, y1, x2, y2, id = result
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            w, h = x2 - x1, y2 - y1
            cx, cy = x1 + w // 2, y1 + h // 2
            results = cv2.pointPolygonTest(np.array(area1, np.int32), ((cx, cy)), False)
            results1 = cv2.pointPolygonTest(np.array(area, np.int32), ((cx, cy)), False)
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
            m1 = 0
            if results >= 0 or results1 >= 0:
                crop = img[y1:y2, x1:x2]
                for i1 in area_c:
                    if id == i1:
                        m1 = 1
                if m1 == 0:
                    area_c.append(id)
            #print(result)
            w, h = x2 - x1, y2 - y1
            cvzone.cornerRect(img, (x1, y1, w, h), l=9, rt=2, colorR=(255, 0, 255))
            cvzone.putTextRect(img, f' {int(id)}', (max(0, x1), max(35, y1)),
                               scale=2, thickness=3, offset=10)
            cx, cy = x1 + w // 2, y1 + h // 2
            cv2.circle(img, (cx, cy), 5, (255, 0, 255), cv2.FILLED)
            if limits[0] < cx < limits[2] and limits[1] - 15 < cy < limits[1] + 15:
                if id in area_c:
                    area_c.remove(id)
                    crop = img[y1:y2, x1:x2]
                    imgwrite(crop)
                    dat = str(int(id))
                    parent_node = 'Violators'
                    data = {"Pic": crop.tolist()}
                    print(type(crop))
                    #_thread.start_new_thread(page2.no_reading, (id,crop))
                    call1(id,crop)
                    cv2.line(img, (limits[0], limits[1]), (limits[2], limits[3]), (0, 255, 0), 5)
        cv2.polylines(img, [np.array(area, np.int32)], True, (0, 255, 0), 3)
        cv2.polylines(img, [np.array(area1, np.int32)], True, (255, 0, 0), 3)
        cv2.line(img, (limits[0], limits[1]), (limits[2], limits[3]), (0, 0, 255), 5)
        # cv2.line(img, (limits[0], limits[1]), (limits[2], limits[3]), (0, 255, 0), 5)
        # cvzone.putTextRect(img, f' Count: {len(totalCount)}', (50, 50))
        # cv2.putText(img,str(len(totalCount)),(255,100),cv2.FONT_HERSHEY_PLAIN,5,(50,50,255),8)
        cv2.imshow("Image", img)
        # cv2.imshow("ImageRegion", imgRegion)
        cv2.waitKey(1)
