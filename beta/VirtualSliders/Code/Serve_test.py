import cv2
import cvzone
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import socket
import threading
import time
import sqlite3
import os
import pygame

count_start = 0
# line 87 imgRaw needs to be fixed
# start sync
# x axis striker bounce thingy
# Locks for synchronization
score = [0,0]
pygame.mixer.init()
client_hand_coordinates_lock = threading.Lock()
server_hand_coordinates_lock = threading.Lock()
client_hand_coordinates = [700, 500, 0, 0]
server_hand_coordinates = [500, 300, 0, 0]
ball_coordinates = [615, 335]
start = 0
restart = 0
countGame =0
right = False
sync = False
turn = False
data1 = ''
data = ''
olay = False
value1="KD"
value2="Joel"
sound_bat = 0
sound_wall = 0
sound_goal = 0
def handle_client_communication(conn):
    global data1
    global data
    global olay
    global client_hand_coordinates
    global server_hand_coordinates
    global ball_coordinates
    global right
    global sync
    global start
    global score
    global sound_bat
    global sound_wall
    global sound_goal
    global restart
    while True:
        # Receive hand coordinates from the client
        # print("in function")
        data = ''
        start = time.time()
        data = conn.recv(1024).decode()
        #print(time.time()-start)
        if data == '':
            print("no data received")
        # print("received")
        if not data:
            break

        right = True
        # Parse the received coordinates
        # print("received: "+data+"\n")
        # print("::::")
        sync = True
        x, y, w, h, ball_coordinates[0], ball_coordinates[1],score[1],score[0],sound_bat,sound_wall,sound_goal = map(int, data.split(','))
        #print("X ball coor:" + str(ball_coordinates[0]) + "y ball coor: " + str(ball_coordinates[1]))
        # print("x: "+str(x)+"y: "+str(y)+"w: "+str(w)+"h: "+str(h))
        # print("Data received: "+data+"\n")
        # data = ""
        # Acquire the data lock to update the hand coordinates
        # with client_hand_coordinates_lock:
        client_hand_coordinates = (x, y, w, h)
        #olay = True
        # Acquire the data lock to access the server hand coordinates
        ##with server_hand_coordinates_lock:

        # Get the server hand coordinates
        if (sync):
            data = ''
            server_coordinates = server_hand_coordinates
            # #
            # #     # Send the server hand coordinates back to the client
            if server_coordinates:
                server_data = ','.join(map(str, server_coordinates))
                # server_data = server_data + ','
                #data1 = ','.join(map(str, ball_coordinates))
                server_data = server_data + ',' + str(restart)
                # server_data = server_data + data1
                if restart == 1:
                    print('restart sent is ' + str(restart))
                # print("Data sent: "+server_data+"\n")
                conn.sendall(server_data.encode())
                restart = 0
                sync = False
    # conn.close()
# def play_hitsound():
#     global sound_goal
#     global sound_wall
#     global sound_bat
#     if sound_bat == 1:
#         hitsound = pygame.mixer.Sound("Resources/hit.wav")
#         hitsound.play()
#         sound_bat = 0
#
# def play_goalsound():
#     global sound_goal
#     global sound_wall
#     global sound_bat
#     if sound_goal == 1:
#         goalsound = pygame.mixer.Sound("Resources/goal.wav")
#         goalsound.play()
#         sound_goal = 0
#
# def play_wallsound():
#     global sound_goal
#     global sound_wall
#     global sound_bat
#     if sound_wall == 1:
#         wallsound = pygame.mixer.Sound("Resources/wall.wav")
#         wallsound.play()
#         sound_wall = 0


# def soundPlay(sound_bat,sound_wall,sound_goal):
#     if sound_bat == 1:
#         play_hitsound()
#     elif sound_wall == 1:
#         play_wallsound()
#     elif sound_goal == 1:
#         play_goalsound()
def start_game(client_socket):
    global turn
    global olay
    global server_hand_coordinates
    global client_hand_coordinates
    global right
    global count_start
    global ball_coordinates
    global sound_bat
    global sound_wall
    global sound_goal
    global restart
    global execcnt
    global start_time
    global query1
    global countGame
    global score


    # database connection
    connection = sqlite3.connect('airhockey.db')
    c = connection.cursor()
    query1 = "insert into scoreset values(?, ?, ?, ?, ?)"
    execcnt = 0

    def close_window(event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            cv2.destroyAllWindows()

    # Stopwatch variables
    start_time = time.time()

    # Set the dimensions of the vertical board
    desired_width = 1280
    desired_height = 720
    cap = cv2.VideoCapture(0)
    cap.set(3, desired_width)
    cap.set(4, desired_height)

    # Importing all images
    imgBackground = cv2.imread("Resources/VSBoard.png")
    imgGameOver = cv2.imread("Resources/gameOver.png")
    imgBall = cv2.imread("Resources/own_ball.png", cv2.IMREAD_UNCHANGED)
    imgBat1 = cv2.imread("Resources/Hbat1.png", cv2.IMREAD_UNCHANGED)
    imgAvatar = cv2.imread("Resources/AVATAR.png", cv2.IMREAD_UNCHANGED)
    imgBat2 = cv2.imread("Resources/Hbat1.png", cv2.IMREAD_UNCHANGED)

    # Hand Detector
    detector = HandDetector(detectionCon=0.8, maxHands=1)

    # Variables
    ballPos = [615, 335]

    speedX = 0
    speedY = 0
    gameOver = False
    ses_end = False
    global score
    lx = 0
    ly = 0
    lw = 0
    lh = 0
    count_bounce = 2
    while True:
        # with client_hand_coordinates_lock:
        # Access and process hand coordinates for each connected client
        # for client_socket, coordinates in client_hand_coordinates.items():
        # Process hand coordinates for the client
        # Example: Access individual coordinates
        rx, ry, rw, rh = client_hand_coordinates
        activeHands = False
        left = False
        _, img = cap.read()
        img = cv2.flip(img, 1)
        # imgRaw = img.copy()
        hands, img = detector.findHands(img, flipType=False)  # with draw
        # Rest of the code...

        # Resize the imgBackground and img to match the desired dimensions
        imgBackground = cv2.resize(imgBackground, (desired_width, desired_height))
        img = cv2.resize(img, (desired_width, desired_height))
        #score[0] = 0
        #score[1] = 1

        img = cv2.addWeighted(img, 0.2, imgBackground, 0.8, 0)
        if hands:
            for hand in hands:
                x, y, w, h = hand['bbox']
                lh, lw, _ = imgBat1.shape
                tempX = x - lw // 2
                tempY = y - lh // 2

                lx = tempX
                ly = tempY
                ly = ly + 300
                # ly = ly + 500
                # print(y1)
                ly = np.clip(ly, 350, 694)
                lx = np.clip(lx, 220, 931)
                server_hand_coordinates = (lx, ly, lw, lh)
                # if hand['type'] == "Left":
                #     left = True
                #     server_hand_coordinates = (lx, ly, lw, lh)

        # if  left or activeHands is False:
        if lx != 0 and ly != 0:

            # print("left  x: "+str(x)+"y: "+str(y)+"w: "+str(w)+"h: "+str(h))
            img = cvzone.overlayPNG(img, imgBat1, (lx, ly))
            if lx <= ballPos[0] <= lx + lw and ly - 50 <= ballPos[1] <= ly and count_bounce != 0:
                speedY = -speedY
                count_bounce = 0
                if (count_start == 0):
                    # turn = True
                    # speedY = -20
                    # speedX = 20
                    count_start = 1

            elif lx <= ballPos[0] <= lx + lw and ly <= ballPos[1] <= ly + lh and count_bounce != 0:
                speedY = -speedY
                count_bounce = 0
                if (count_start == 0):
                    # turn = True
                    # speedY = 20
                    # speedX = 20
                    count_start = 1

                # ballPos[0] += speedX
                # ballPos[1] += speedY
                # with server_hand_coordinates_lock:
                # server_hand_coordinates = (lx, ly, lw, lh)
                # print(server_hand_coordinates)

        if right:
            # print("left  x: "+str(x)+"y: "+str(y)+"w: "+str(w)+"h: "+str(h))
            mptW = desired_width // 2
            mptH = desired_height // 2
            ry = ry - 2 * (ry - mptH) - rh
            if rx >= mptW:
                rx = rx - 2 * (rx - mptW) - rw
                # print("first if")
            elif rx < mptW:
                rx = rx + 2 * (mptW - rx) - rw
                # print("Second if")

            img = cvzone.overlayPNG(img, imgBat2, (rx, ry))

        # Have to implement the scoring system logic based on the air hockey scoring area instead of just updating after every
        # slider hit

        # What does incrementing ballPos[0] by 30

        # Game Over
        cv2.putText(img, str(int(score[0])).zfill(1), (75, 148), cv2.FONT_HERSHEY_COMPLEX, 1.5, (18.9, 9.7, 111.6), 3)
        cv2.putText(img, str(score[1]).zfill(1), (1133, 148), cv2.FONT_HERSHEY_COMPLEX, 1.5, (18.9, 9.7, 111.6), 3)
        cv2.putText(img, str(value2).zfill(1), (1123, 78), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (18.9, 9.7, 111.6), 3)
        cv2.putText(img, str(value1).zfill(1), (75, 78), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (18.9, 9.7, 111.6), 3)
        # elif ballPos[0] > 508 and ballPos[1] <=11:
        #     gameOver = True
        if ses_end:
            # ballPos = [615, 335]
            speedX = 0
            speedY = 0
            ses_end = False
            count_start = 0
            count_bounce = 2
        #print(str(score[0]) + " " + str(score[1]))
        if (score[0] == 2 or score[1] == 2):
            gameOver = True

        if gameOver:

            img = imgGameOver


            cv2.putText(img, str(score[0]).zfill(2), (370, 360), cv2.FONT_HERSHEY_COMPLEX, 2.5, (200, 0, 200), 5)
            cv2.putText(img, str(score[1]).zfill(2), (800, 360), cv2.FONT_HERSHEY_COMPLEX, 2.5, (200, 0, 200), 5)

            # get elapsed time for database update
            if start_time is not None:
                elapsed_time = time.time() - start_time
                formatted_time = time.strftime("%H:%M:%S", time.gmtime(elapsed_time))
                print("Elapsed Time: ", formatted_time)
                start_time = None  # Reset start_time to None

            # update database
            if execcnt == 0:
                c.execute(query1, (value1, value2, score[0], score[1], formatted_time))
                connection.commit()
            execcnt = execcnt + 1

            if (score[0] > score[1]):
                cv2.putText(img, str(value1) + " wins".zfill(1), (566, 360), cv2.FONT_HERSHEY_SIMPLEX, 1,(31.3, 182, 194.1), 3)

            else:
                cv2.putText(img, str(value2) + " wins".zfill(1), (566, 360), cv2.FONT_HERSHEY_SIMPLEX, 1,(31.3, 182, 194.1), 3)
        # if gameOver:
        # img = imgGameOver
        # cv2.putText(img, str(score[1] + score[0]).zfill(2), (585, 360), cv2.FONT_HERSHEY_COMPLEX,
        # 2.5, (200, 0, 200), 5)

        # If game not over move the ball
        else:
            ballPos = ball_coordinates
            # Move the Ball
            # if ballPos[0] >= 1010 or ballPos[0] <= 230:
            #     play_wallsound()
            #     count_bounce = 2
            #     olay = True
            #     speedX = -speedX
            #
            # if ballPos[1] >= 670 or ballPos[1] <= 10:
            #     play_wallsound()
            #     count_bounce = 2
            #     olay = True
            #     speedY = -speedY
            #
            # ballPos[0] += speedX
            # ballPos[1] += speedY
            # if turn:
            #     if (ballPos[0] < mptW):  # 1st qudrant
            #         ball_coordinates[0] = ballPos[0] - 50 + 2 * (mptW - ballPos[0])
            #     elif (ballPos[0] >= mptW):  # 2nd quadrant
            #         ball_coordinates[0] = ballPos[0] - 50 - 2 * (ballPos[0] - mptW)
            #     if (ballPos[1] >= mptH):
            #         ball_coordinates[1] = ballPos[1] - 50 - 2 * (ballPos[1] - mptH)
            #     elif (ballPos[1] < mptH):
            #         ball_coordinates[1] = ballPos[1] - 50 + 2 * (mptH-ballPos[1])
            # else:
            #ballPos = ball_coordinates
            # ballPos[0] = np.clip(ballPos[0], 220, 1010)
            # ballPos[1] = np.clip(ballPos[1], 0, 670)
            #print("X ball "+str(ball_coordinates[0])+"y ball: "+str(ball_coordinates[1]))
            # print("speedX: " + str(speedX) + "speedY: " + str(speedY) + "ballPose[0]: " + str(
            #     ballPos[0]) + "ballPos[1]: " + str(ballPos[1]))
            # Draw the ball

            ballPos[0] = np.clip(ballPos[0], 220, 1010)
            ballPos[1] = np.clip(ballPos[1], 0, 670)
            #print("X ball " + str(ball_coordinates[0]) + "y ball: " + str(ball_coordinates[1]))
            img = cvzone.overlayPNG(img, imgBall, ballPos)

            # sound = [sound_bat, sound_wall, sound_goal]
            # soundPlay(sound_bat,sound_wall,sound_goal)
            # if sound_bat == 1:
            #     play_hitsound()
            # elif sound_wall == 1:
            #     play_wallsound()
            # elif sound_goal == 1:
            #     play_goalsound()
            '''
            thread1 = threading.Thread(target=soundPlay, args=sound)
            thread1.daemon = True
            thread1.start()
            '''


            """
            if (ballPos[0] < 780 and ballPos[0] > 508 and ballPos[1] <= 11 and time.time()-start>0.5):  # you get a point
                print(time.time()-start)
                ses_end = True
                print("you score")
                #score[0] = score[0] + 1 #supposed to be 1
                print(str(score[0]) + " " + str(score[1]))
                start = time.time()
            elif (ballPos[0] < 780 and ballPos[0] > 508 and ballPos[1] >= 669 and time.time()-start>0.5):  # opp gets a point
                print(time.time() - start)
                ses_end = True
                print("opp score")
                #score[1] = score[1] + 1
                print(str(score[0]) + " " + str(score[1]))
                start = time.time()
            # print(str(time.time() - start)+"olay: "+ str(olay))
            """

        # print(str(count_bounce) + "\n")
        # cv2.moveWindow("Image", 0, 0)
        cv2.imshow("Image", img)
        key = cv2.waitKey(1)
        if key == ord('r'):
            print('entered restart')
            ballPos = [615, 335]
            speedX = 0
            speedY = 0
            restart = 1
            count_bounce = 2
            count_start=0
            gameOver = False
            score = [0, 0]
            print('entered restart')
           # imgGameOver = cv2.imread("Resources/gameOver.png")
        if key == ord('q'):
            break
        if cv2.getWindowProperty('Image',cv2.WND_PROP_VISIBLE)<1:
            break

    cap.release()
    cv2.destroyAllWindows()


def server_program(username, oppname):
    global value1
    global value2
    host = socket.gethostname()
    port = 2000
    value1 = username
    value2 = oppname

    server_socket = socket.socket()
    server_socket.bind((host, port))
    server_socket.listen(2)

    print(host + " Server started. Waiting for connections...")

    while True:
        client_socket, addr = server_socket.accept()
        print("Connected with", addr)

        # Start the game in a separate thread
        game_thread = threading.Thread(target=start_game, args=(client_socket,))
        game_thread.start()

        # Create a new thread to handle the client connection
        client_thread = threading.Thread(target=handle_client_communication, args=(client_socket,))
        client_thread.start()

        game_thread.join()
        client_thread.join()
        client_socket.close()
