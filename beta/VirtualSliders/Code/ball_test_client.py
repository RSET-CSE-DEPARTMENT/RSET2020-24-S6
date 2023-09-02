import cv2
import cvzone
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import socket
import threading
import time
import pygame
import sqlite3

pygame.mixer.init()

# Locks for synchronization
client_hand_coordinates_lock = threading.Lock()
server_hand_coordinates_lock = threading.Lock()

client_hand_coordinates = [500, 300, 0, 0]
server_hand_coordinates = [0, 0, 0, 0]
ball_coordinates = [615, 335]
name0 = "levi"
name1 = "ackerman"
left = False
count_start = 0
data = ''
data1 = ''
data2 = ''
sound_bat = 0
sound_wall = 0
sound_goal = 0
sync = True
turn = False
olay = False
score = [0, 0]
restart = 0


def handle_server_communication(client_socket):
    global client_hand_coordinates
    global server_hand_coordinates
    global ball_coordinates
    global left
    global data
    global data1
    global data2
    global sync
    global score
    global sound_goal
    global sound_bat
    global sound_wall
    global restart

    while True:
        # Receive hand coordinates from the server
        if sync:
            client_coordinates = client_hand_coordinates

            # Send the client hand coordinates back to the server
            data = ''
            data1 = ''
            data2 = ''
            data = ','.join(map(str, client_coordinates))
            data = data + ','
            data1 = ','.join(map(str, ball_coordinates))
            data = data + data1 + ','
            data2 = ','.join(map(str, score))
            data = data + data2 + ',' + str(sound_bat) + ',' + str(sound_wall) + ',' + str(sound_goal)

            client_socket.sendall(data.encode())
            sync = False

        data = client_socket.recv(1024).decode()
        if not data:
            break

        left = True
        x, y, w, h, restart = map(int, data.split(','))
        if restart == 1:
            print('restart recieved is ' + str(restart))
        with server_hand_coordinates_lock:
            server_hand_coordinates = (x, y, w, h)
        sync = True


def play_hitsound():
    hitsound = pygame.mixer.Sound("Resources/hit.wav")
    hitsound.play()


def play_goalsound():
    goalsound = pygame.mixer.Sound("Resources/goal.wav")
    goalsound.play()


def play_wallsound():
    wallsound = pygame.mixer.Sound("Resources/wall.wav")
    wallsound.play()


def start_game(client_socket):
    global left
    global count_start
    global server_hand_coordinates
    global client_hand_coordinates
    global ball_coordinates
    global turn
    global olay
    global score
    global sound_bat
    global sound_wall
    global sound_goal
    global execcnt
    global start_time
    global value1
    global value2
    global restart

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
    ses_end = False
    check = [0, 0]

    # Importing all images
    imgBackground = cv2.imread("Resources/VSboard.png")
    imgGameOver = cv2.imread("Resources/gameOver.png")
    imgBall = cv2.imread("Resources/Ball.png", cv2.IMREAD_UNCHANGED)
    imgBat1 = cv2.imread("Resources/Hbat1.png", cv2.IMREAD_UNCHANGED)
    imgBat2 = cv2.imread("Resources/Hbat1.png", cv2.IMREAD_UNCHANGED)

    # Hand Detector
    detector = HandDetector(detectionCon=0.8, maxHands=1)

    # Variables
    ballPos = [615, 335]
    speedX = 0
    speedY = 0
    gameOver = False
    rx = 0
    ry = 0
    rw = 0
    rh = 0
    mptW = desired_width // 2
    mptH = desired_height // 2
    count_bounce = 2

    while True:
        activeHands = False
        right = False
        _, img = cap.read()
        img = cv2.flip(img, 1)

        hands, img = detector.findHands(img, flipType=False)

        imgBackground = cv2.resize(imgBackground, (desired_width, desired_height))
        img = cv2.resize(img, (desired_width, desired_height))
        img = cv2.addWeighted(img, 0.2, imgBackground, 0.8, 0)

        if hands:
            activeHands = True
            for hand in hands:
                x, y, w, h = hand['bbox']
                rh, rw, _ = imgBat1.shape
                tempX = x - rw // 2
                tempY = y - rh // 2

                rx = tempX
                ry = tempY

                ry = np.clip(ry, 360, 694)
                rx = np.clip(rx, 220, 931)
                client_hand_coordinates = (rx, ry, rw, rh)

                if hand['type'] == "Right":
                    right = True

        """if check != score or check == score == [0, 0]:
            check = score
            count_bounce = 2"""

        if rx != 0 and ry != 0:
            client_hand_coordinates = (rx, ry, rw, rh)

            img = cvzone.overlayPNG(img, imgBat1, (rx, ry))

            if count_bounce != 1:
                if rx <= ballPos[0] <= rx + rw and ry - 50 <= ballPos[1] <= ry:
                    speedY = -speedY
                    play_hitsound()
                    count_bounce = 1
                    sound_bat = 1
                    sound_wall = 0
                    sound_goal = 0
                    if count_start == 0:
                        speedX = 30
                        speedY = -30
                        turn = True
                        count_start = 1
                elif rx < ballPos[0] <= rx + rw and ry <= ballPos[1] <= ry + rh:
                    speedY = -speedY
                    play_hitsound()
                    sound_bat = 1
                    sound_wall = 0
                    sound_goal = 0
                    count_bounce = 1

        if left:
            lx, ly, lw, lh = server_hand_coordinates

            ly = ly - 2 * (ly - mptH) - lh
            if lx >= mptW:
                lx = lx - 2 * (lx - mptW) - lw
            elif lx < mptW:
                lx = lx + 2 * (mptW - lx) - lw

            img = cvzone.overlayPNG(img, imgBat2, (lx, ly))

            if count_bounce != 0:
                if lx <= ballPos[0] <= lx + lw and ly >= ballPos[1] >= ly - 50:
                    speedY = -speedY
                    play_hitsound()
                    sound_bat = 1
                    sound_wall = 0
                    sound_goal = 0
                    if count_start == 0:
                        speedX = -30
                        speedY = 30
                        count_start = 1
                    count_bounce = 0

                elif lx <= ballPos[0] <= lx + lw and ly >= ballPos[1] >= ly - lh:
                    speedY = -speedY
                    play_hitsound()
                    sound_bat = 1
                    sound_wall = 0
                    sound_goal = 0
                    count_bounce = 0
                    if count_start == 0:
                        speedX = -30
                        speedY = 30
                        count_start = 1

        cv2.putText(img, str(int(score[0])).zfill(1), (75, 148), cv2.FONT_HERSHEY_COMPLEX, 1.5, (18.9, 9.7, 111.6), 3)
        cv2.putText(img, str(score[1]).zfill(1), (1133, 148), cv2.FONT_HERSHEY_COMPLEX, 1.5, (18.9, 9.7, 111.6), 3)
        cv2.putText(img, str(name1).zfill(1), (1123, 78), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (18.9, 9.7, 111.6), 3)
        cv2.putText(img, str(name0).zfill(1), (75, 78), cv2.FONT_HERSHEY_SIMPLEX, 1.5, (18.9, 9.7, 111.6), 3)

        if (ballPos[0] < 780 and ballPos[0] > 508 and ballPos[1] <= 11):
            ses_end = True
            play_goalsound()
            sound_goal = 1
            sound_bat = 0
            sound_wall = 0
            score[0] = score[0] + 1
            print("you score")
        elif (ballPos[0] < 780 and ballPos[0] > 508 and ballPos[1] >= 670):
            ses_end = True
            play_goalsound()
            sound_goal = 1
            sound_bat = 0
            sound_wall = 0
            score[1] = score[1] + 1
            print("opp score")

        if ses_end:
            ballPos = [615, 335]
            speedX = 0
            speedY = 0
            ses_end = False
            count_start = 0
            count_bounce = 2

        if score[1] == 2 or score[0] == 2:
            gameOver = True

        if gameOver:
            img = imgGameOver
            count_start = 0
            count_bounce = 2
            cv2.putText(img, str(score[0]).zfill(2), (370, 360), cv2.FONT_HERSHEY_COMPLEX, 2.5, (200, 0, 200), 5)
            cv2.putText(img, str(score[1]).zfill(2), (800, 360), cv2.FONT_HERSHEY_COMPLEX, 2.5, (200, 0, 200), 5)
            cv2.putText(img, str(score[1]).zfill(2), (800, 360), cv2.FONT_HERSHEY_COMPLEX, 2.5, (200, 0, 200), 5)
            cv2.putText(img, str(score[0]).zfill(2), (370, 360), cv2.FONT_HERSHEY_COMPLEX, 2.5, (200, 0, 200), 5)
            if (score[0] > score[1]):
                cv2.putText(img, str(name0) + " wins".zfill(1), (566, 360), cv2.FONT_HERSHEY_SIMPLEX, 1,
                            (31.3, 182, 194.1), 3)
            else:
                cv2.putText(img, str(name1) + " wins".zfill(1), (566, 360), cv2.FONT_HERSHEY_SIMPLEX, 1,
                            (31.3, 182, 194.1), 3)

            if start_time is not None:
                elapsed_time = time.time() - start_time
                formatted_time = time.strftime("%H:%M:%S", time.gmtime(elapsed_time))
                print("Elapsed Time:", formatted_time)
                start_time = None

            if execcnt == 0:
                c.execute(query1, (name0, name1, score[0], score[1], formatted_time))
                connection.commit()
            execcnt += 1

        else:
            if ballPos[0] >= 1010 or ballPos[0] <= 230:
                speedX = -speedX
                play_wallsound()
                sound_wall = 1
                sound_bat = 0
                sound_goal = 0
                if olay == False:
                    olay = True
                count_bounce = 2

            if ballPos[1] >= 670 or ballPos[1] <= 10:
                speedY = -speedY
                play_wallsound()
                sound_wall = 1
                sound_bat = 0
                sound_goal = 0
                if olay == False:
                    olay = True
                count_bounce = 2

            ballPos[0] += speedX
            ballPos[1] += speedY

            ballPos[0] = np.clip(ballPos[0], 220, 1010)
            ballPos[1] = np.clip(ballPos[1], 0, 670)

            if (ballPos[0] < mptW):
                ball_coordinates[0] = ballPos[0] - 50 + 2 * (mptW - ballPos[0])
            elif (ballPos[0] >= mptW):
                ball_coordinates[0] = ballPos[0] - 50 - 2 * (ballPos[0] - mptW)
            if (ballPos[1] >= mptH):
                ball_coordinates[1] = ballPos[1] - 50 - 2 * (ballPos[1] - mptH)
            elif (ballPos[1] < mptH):
                ball_coordinates[1] = ballPos[1] - 50 + 2 * (mptH - ballPos[1])

            img = cvzone.overlayPNG(img, imgBall, ballPos)

        cv2.imshow("Image", img)
        if restart == 1:
            print('Entered restart')
            ballPos = [100, 100]
            speedX = 15
            speedY = 15
            gameOver = False
            score = [0, 0]
            #imgGameOver = cv2.imread("Resources/gameOver.png")
            sound_bat=0
            sound_wall=0
            sound_goal=0
            start_time = time.time()  # Reset stopwatch
            print("Game Restarted")
            execcnt = 0
        key = cv2.waitKey(1)
        if key == ord('q'):
            break

        if cv2.getWindowProperty('Image', cv2.WND_PROP_VISIBLE) < 1:
            break

    cap.release()
    cv2.destroyAllWindows()


def client_program(username, oppname, ip):
    global name0
    global name1
    name0 = username
    name1 = oppname
    host = ip
    port = 2000

    client_socket = socket.socket()
    client_socket.connect((host, port))

    game_thread = threading.Thread(target=start_game, args=(client_socket,))
    game_thread.start()

    server_comm_thread = threading.Thread(target=handle_server_communication, args=(client_socket,))
    server_comm_thread.start()

    game_thread.join()
    server_comm_thread.join()

    client_socket.close()
