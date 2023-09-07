import os
import tensorflow as tf
from IPython import get_ipython
from object_detection.utils import config_util
import cv2
import numpy as np
from matplotlib import pyplot as plt
from object_detection.protos import pipeline_pb2
from google.protobuf import text_format
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as viz_utils
from object_detection.builders import model_builder
import easyocr
from pyrebase import pyrebase
import keras_ocr
import blur
def no_reading(id, image_np):
    CUSTOM_MODEL_NAME = 'my_ssd_mobnet'
    PRETRAINED_MODEL_NAME = 'ssd_mobilenet_v2_fpnlite_320x320_coco17_tpu-8'
    PRETRAINED_MODEL_URL = 'http://download.tensorflow.org/models/object_detection/tf2/20200711/ssd_mobilenet_v2_fpnlite_320x320_coco17_tpu-8.tar.gz'
    TF_RECORD_SCRIPT_NAME = 'generate_tfrecord.py'
    LABEL_MAP_NAME = 'label_map.pbtxt'
    print(id)
    paths = {
        'WORKSPACE_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace'),
        'SCRIPTS_PATH': os.path.join('ANPR', 'Tensorflow', 'scripts'),
        'APIMODEL_PATH': os.path.join('ANPR', 'Tensorflow', 'models'),
        'ANNOTATION_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'annotations'),
        'IMAGE_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'images'),
        'MODEL_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'models'),
        'PRETRAINED_MODEL_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'pre-trained-models'),
        'CHECKPOINT_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'models', CUSTOM_MODEL_NAME),
        'OUTPUT_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'models', CUSTOM_MODEL_NAME, 'export'),
        'TFJS_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'models', CUSTOM_MODEL_NAME, 'tfjsexport'),
        'TFLITE_PATH': os.path.join('ANPR', 'Tensorflow', 'workspace', 'models', CUSTOM_MODEL_NAME, 'tfliteexport'),
        'PROTOC_PATH': os.path.join('ANPR', 'Tensorflow', 'protoc')
    }
    files = {
        'PIPELINE_CONFIG': os.path.join('ANPR', 'Tensorflow', 'workspace', 'models', CUSTOM_MODEL_NAME,
                                        'pipeline.config'),
        'TF_RECORD_SCRIPT': os.path.join(paths['SCRIPTS_PATH'], TF_RECORD_SCRIPT_NAME),
        'LABELMAP': os.path.join(paths['ANNOTATION_PATH'], LABEL_MAP_NAME)
    }
    try:
        # Disable all GPUS
        tf.config.set_visible_devices([], 'GPU')
        visible_devices = tf.config.get_visible_devices()
        for device in visible_devices:
            assert device.device_type != 'GPU'
    except:
        # Invalid device or cannot modify virtual devices once initialized.
        pass
    # Load pipeline config and build a detection model
    # VERIFICATION_SCRIPT = os.path.join(paths['APIMODEL_PATH'], 'research', 'object_detection', 'builders', 'model_builder_tf2_test.py')
    # # Verify Installation
    # print(VERIFICATION_SCRIPT)
    # get_ipython().system('python {VERIFICATION_SCRIPT}')
    # os.environ['CUDA_VISIBLE_DEVICES'] = ''
    try:
        configs = config_util.get_configs_from_pipeline_file(files['PIPELINE_CONFIG'])
        detection_model = model_builder.build(model_config=configs['model'], is_training=False)
        #
        # Restore checkpoint
        ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
        ckpt.restore(os.path.join(paths['CHECKPOINT_PATH'], 'ckpt-11')).expect_partial()
        @tf.function
        def detect_fn(image):
            image, shapes = detection_model.preprocess(image)
            prediction_dict = detection_model.predict(image, shapes)
            detections = detection_model.postprocess(prediction_dict, shapes)
            return detections
        category_index = label_map_util.create_category_index_from_labelmap(files['LABELMAP'])
        # IMAGE_PATH = os.path.join(paths['IMAGE_PATH'], 'test', '08_07_2023_08_53_30.png')
        # img = cv2.imread(IMAGE_PATH)
        # print(type(img))
        # image_np = np.array(img)
        input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
        detections = detect_fn(input_tensor)
        num_detections = int(detections.pop('num_detections'))
        detections = {key: value[0, :num_detections].numpy()
                      for key, value in detections.items()}
        detections['num_detections'] = num_detections
        # detection_classes should be ints.
        detections['detection_classes'] = detections['detection_classes'].astype(np.int64)
        label_id_offset = 1
        image_np_with_detections = image_np.copy()
        viz_utils.visualize_boxes_and_labels_on_image_array(
            image_np_with_detections,
            detections['detection_boxes'],
            detections['detection_classes'] + label_id_offset,
            detections['detection_scores'],
            category_index,
            use_normalized_coordinates=True,
            max_boxes_to_draw=5,
            min_score_thresh=.6,
            agnostic_mode=False)
        # cv2.imshow('1', image_np_with_detections)
        # cv2.waitKey(0)
        detection_threshold = 0.6
        image = image_np_with_detections
        scores = list(filter(lambda x: x >= detection_threshold, detections['detection_scores']))
        boxes = detections['detection_boxes'][:len(scores)]
        classes = detections['detection_classes'][:len(scores)]
        width = image.shape[1]
        height = image.shape[0]
        print(boxes)
        eng = ""
        msg = "None"
        # ROI Filtering and OCR
        for idx, box in enumerate(boxes):
            roi = box * [height, width, height, width]
            region = image[int(roi[0]):int(roi[2]), int(roi[1]):int(roi[3])]
            # reader = easyocr.Reader(['en','th'], gpu=False)
            # ocr_result = reader.readtext(image_np)
            msg = blur.blur(region)
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
            firebase = pyrebase.initialize_app(config)
            database = firebase.database()
            len1 = database.child("Violators").get()
            print(len(len1.each()))
            print(type(len(len1.each())))
            # if len1 is None:
            #     len2 = 1
            # else:
            #
            len2 = len(len1.each())
            database.child("Violators").child(len2).child("Pic").set(image_np.tolist())
            database.child("Plate").child(len2).set(msg)
            len3 = database.child("RTO").get()
            fla = 0
            for k in len3.val():
                if k == msg:
                    num = database.child("RTO").child(msg).child("num").get()
                    num1 = int(num.val())
                    num1 = num1 + 1
                    database.child("RTO").child(msg).child("num").set(str(num1))
                    fla = 1
                    break
            if fla == 0:
                database.child("RTO").child(msg).child("num").set("1")
    except Exception as e:
        print(e)
# no_reading()