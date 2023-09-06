import cv2
import numpy as np
from tensorflow import keras
from keras.models import load_model
from collections import deque
import pytesseract
from twilio.rest import Client
from ocrwithtwilioCOPY import detect_violence_in_video


IMAGE_HEIGHT, IMAGE_WIDTH = 64, 64

SEQUENCE_LENGTH = 16

def preprocess_frame(frame,IMAGE_WIDTH,IMAGE_HEIGHT):
    
    resized_frame = cv2.resize(frame, (IMAGE_WIDTH, IMAGE_HEIGHT))

    normalized_frame = resized_frame / 255.0

    return normalized_frame


def predict_frames(video_file_path, output_file_path, sequence_length):
    
    CLASSES_LIST = ["NonViolence", "Violence"]
    
    MoBiLSTM_model = load_model(r' ')
    
    video_reader = cv2.VideoCapture(video_file_path)

    original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))

    video_writer = cv2.VideoWriter(output_file_path, cv2.VideoWriter_fourcc(*'mp4v'),
                                   video_reader.get(cv2.CAP_PROP_FPS), (original_video_width, original_video_height))

    frames_queue = deque(maxlen=sequence_length)

    predicted_class_name = ''

    while video_reader.isOpened():
        ok, frame = video_reader.read()

        if not ok:
            break

        preprocessed_frame = preprocess_frame(frame,64,64)

        frames_queue.append(preprocessed_frame)

        if len(frames_queue) == sequence_length:
    
            predicted_labels_probabilities = MoBiLSTM_model.predict(np.array([frames_queue]))

            predicted_label = np.argmax(predicted_labels_probabilities)

            predicted_class_name = CLASSES_LIST[predicted_label]

        text_position = (5, 100)
        text_thickness = 2
        text_size = 3
        text_padding = 10
        text_width = cv2.getTextSize(predicted_class_name, cv2.FONT_HERSHEY_SIMPLEX, text_size, text_thickness)[0][0]
        text_height = cv2.getTextSize(predicted_class_name, cv2.FONT_HERSHEY_SIMPLEX, text_size, text_thickness)[0][1]
        rectangle_width = text_width + 2 * text_padding
        rectangle_height = text_height + 2 * text_padding
        rectangle_position = (5, 30)
        #kira queen daisan no bakudan bites za dusto
        cv2.rectangle(frame, rectangle_position, (rectangle_position[0] + rectangle_width, rectangle_position[1] + rectangle_height), (255, 255, 255), cv2.FILLED)

        if predicted_class_name == "Violence":
            cv2.putText(frame, predicted_class_name, text_position, cv2.FONT_HERSHEY_SIMPLEX, text_size, (0, 0, 0), text_thickness + 2, cv2.LINE_AA)
            cv2.putText(frame, predicted_class_name, text_position, cv2.FONT_HERSHEY_SIMPLEX, text_size, (0, 0, 0), 2, cv2.LINE_AA)
        else:
            cv2.putText(frame, "Normal", text_position, cv2.FONT_HERSHEY_SIMPLEX, text_size, (255, 255, 255), text_thickness + 2, cv2.LINE_AA)
            cv2.putText(frame, "Normal", text_position, cv2.FONT_HERSHEY_SIMPLEX, text_size, (0, 0, 0), 2, cv2.LINE_AA)

        video_writer.write(frame)

    video_reader.release()
    video_writer.release()
    video_path = r" "
    detect_violence_in_video(video_path)
    return 1

