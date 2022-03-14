#https://towardsdatascience.com/video-streaming-in-web-browsers-with-opencv-flask-93a38846fe00
#Import necessary libraries
from flask import Flask, render_template, Response, request, send_file, jsonify
import cv2
import datetime
import boto3
from botocore.exceptions import NoCredentialsError
from io import BytesIO
from PIL import Image
from matplotlib import cm
import numpy as np
import time
import os
import tarfile
import urllib.request

ACCESS_KEY = 'AKIA2X357CBVPHQAVH2E'
SECRET_KEY = '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'

DATA_DIR = os.path.join(os.getcwd(), 'data')
MODELS_DIR = os.path.join(DATA_DIR, 'models')
for dir in [DATA_DIR, MODELS_DIR]:
    if not os.path.exists(dir):
        os.mkdir(dir)

# Download and extract model
MODEL_DATE = '20200711'
MODEL_NAME = 'ssd_resnet101_v1_fpn_640x640_coco17_tpu-8'
MODEL_TAR_FILENAME = MODEL_NAME + '.tar.gz'
MODELS_DOWNLOAD_BASE = 'http://download.tensorflow.org/models/object_detection/tf2/'
MODEL_DOWNLOAD_LINK = MODELS_DOWNLOAD_BASE + MODEL_DATE + '/' + MODEL_TAR_FILENAME
PATH_TO_MODEL_TAR = os.path.join(MODELS_DIR, MODEL_TAR_FILENAME)
PATH_TO_CKPT = os.path.join(MODELS_DIR, os.path.join(MODEL_NAME, 'checkpoint/'))
PATH_TO_CFG = os.path.join(MODELS_DIR, os.path.join(MODEL_NAME, 'pipeline.config'))
if not os.path.exists(PATH_TO_CKPT):
    print('Downloading model. This may take a while... ', end='')
    urllib.request.urlretrieve(MODEL_DOWNLOAD_LINK, PATH_TO_MODEL_TAR)
    tar_file = tarfile.open(PATH_TO_MODEL_TAR)
    tar_file.extractall(MODELS_DIR)
    tar_file.close()
    os.remove(PATH_TO_MODEL_TAR)
    print('Done')

# Download labels file
LABEL_FILENAME = 'mscoco_label_map.pbtxt'
LABELS_DOWNLOAD_BASE = \
    'https://raw.githubusercontent.com/tensorflow/models/master/research/object_detection/data/'
PATH_TO_LABELS = os.path.join(MODELS_DIR, os.path.join(MODEL_NAME, LABEL_FILENAME))
if not os.path.exists(PATH_TO_LABELS):
    print('Downloading label file... ', end='')
    urllib.request.urlretrieve(LABELS_DOWNLOAD_BASE + LABEL_FILENAME, PATH_TO_LABELS)
    print('Done')

#load the model
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'    # Suppress TensorFlow logging
import tensorflow as tf
from object_detection.utils import label_map_util
from object_detection.utils import config_util
from object_detection.utils import visualization_utils as viz_utils
from object_detection.builders import model_builder

tf.get_logger().setLevel('ERROR')           # Suppress TensorFlow logging (2)

# Enable GPU dynamic memory allocation
gpus = tf.config.experimental.list_physical_devices('GPU')
for gpu in gpus:
    tf.config.experimental.set_memory_growth(gpu, True)

# Load pipeline config and build a detection model
configs = config_util.get_configs_from_pipeline_file(PATH_TO_CFG)
model_config = configs['model']
detection_model = model_builder.build(model_config=model_config, is_training=False)

# Restore checkpoint
ckpt = tf.compat.v2.train.Checkpoint(model=detection_model)
ckpt.restore(os.path.join(PATH_TO_CKPT, 'ckpt-0')).expect_partial()

@tf.function
def detect_fn(image):
    """Detect objects in image."""

    image, shapes = detection_model.preprocess(image)
    prediction_dict = detection_model.predict(image, shapes)
    detections = detection_model.postprocess(prediction_dict, shapes)

    return detections, prediction_dict, tf.reshape(shapes, [-1])

category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS,
                                                                    use_display_name=True)

def upload_to_aws(pil_image, bucket, s3_file_name):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,aws_secret_access_key=SECRET_KEY)

    # Save the image to an in-memory file
    in_mem_file = BytesIO()
    pil_image.save(in_mem_file, format='jpeg')
    in_mem_file.seek(0)

    try:
        # Upload image to s3
        s3.upload_fileobj(in_mem_file, 'mainmediabucket', s3_file_name, ExtraArgs={'ContentType': "image/jpeg"})
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

def upload_video_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        s3.upload_file(local_file, bucket, s3_file, ExtraArgs={'ContentType': "video/avi"})
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

#Initialize the Flask app
app = Flask(__name__)


def apply_timestamp(fram):
    font = cv2.FONT_HERSHEY_DUPLEX
 
    #date and time as variable
    dt = str(datetime.datetime.now())
    color = (0, 0, 0)

    #lay date and time video frame
    fram = cv2.putText(fram, dt,
                    (10, 100),
                    font, 1,
                    color,
                    4, cv2.LINE_8)

    return fram

camera = cv2.VideoCapture(0)
def gen_frames():
    global motion_list
    global static_back
    global toggle_motion
    while camera.isOpened():
        success, frame = camera.read()
        if success:
            frame = apply_timestamp(frame)
        if not success:
            break
        else:
            # Initializing motion = 0(no motion)
            motion = 0
    
            # Converting color image to gray_scale image
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
            # Converting gray scale image to GaussianBlur
            # so that change can be find easily
            gray = cv2.GaussianBlur(gray, (21, 21), 0)
        
            # In first iteration we assign the value
            # of static_back to our first frame
            if static_back is None:
                static_back = gray
                continue
        
            # Difference between static background
            # and current frame(which is GaussianBlur)
            diff_frame = cv2.absdiff(static_back, gray)
        
            # If change in between static background and
            # current frame is greater than 30 it will show white color(255)
            thresh_frame = cv2.threshold(diff_frame, 30, 255, cv2.THRESH_BINARY)[1]
            thresh_frame = cv2.dilate(thresh_frame, None, iterations = 2)
        
            # Finding contour of moving object
            cnts,_ = cv2.findContours(thresh_frame.copy(),
                            cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            # Show the total number of contours that were detected

            if len(cnts) >= 10 and toggle_motion == True:
                print("motion detected")
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                PIL_image = Image.fromarray(np.uint8(frame)).convert('RGB')
                PIL_image.name = "theimg"
                
                timetaken = time.ctime().replace(r':','_')
                #print(timetaken)
                PIL_image.save("snapshot_" + timetaken + ".png")
            for contour in cnts:
                if cv2.contourArea(contour) < 10000:
                    continue
                motion = 1
        
                (x, y, w, h) = cv2.boundingRect(contour)
                # making green rectangle around the moving object
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)
        
            # Appending status of motion
            motion_list.append(motion)
        
            motion_list = motion_list[-2:]

                # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
            image_np_expanded = np.expand_dims(frame, axis=0)

            input_tensor = tf.convert_to_tensor(np.expand_dims(frame, 0), dtype=tf.float32)
            detections, predictions_dict, shapes = detect_fn(input_tensor)

            label_id_offset = 1
            image_np_with_detections = frame.copy()

            viz_utils.visualize_boxes_and_labels_on_image_array(
                image_np_with_detections,
                detections['detection_boxes'][0].numpy(),
                (detections['detection_classes'][0].numpy() + label_id_offset).astype(int),
                detections['detection_scores'][0].numpy(),
                category_index,
                use_normalized_coordinates=True,
                max_boxes_to_draw=200,
                min_score_thresh=.30,
                agnostic_mode=False)
                
            ret2, buffer = cv2.imencode(".jpg", image_np_with_detections)
            image_np_with_detections = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + image_np_with_detections + b'\r\n')  # concat frame one by one and show result

def gen_frames2():
    global motion_list
    global static_back
    while camera.isOpened():
        #New Code below
        ret1, image_np = camera.read()

        # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
        image_np_expanded = np.expand_dims(image_np, axis=0)

        input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
        detections, predictions_dict, shapes = detect_fn(input_tensor)

        label_id_offset = 1
        image_np_with_detections = image_np.copy()

        viz_utils.visualize_boxes_and_labels_on_image_array(
            image_np_with_detections,
            detections['detection_boxes'][0].numpy(),
            (detections['detection_classes'][0].numpy() + label_id_offset).astype(int),
            detections['detection_scores'][0].numpy(),
            category_index,
            use_normalized_coordinates=True,
            max_boxes_to_draw=200,
            min_score_thresh=.30,
            agnostic_mode=False)
 
        ret2, buffer = cv2.imencode(".jpg", image_np_with_detections)
        image_np_with_detections = buffer.tobytes()
        yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + image_np_with_detections + b'\r\n')  # concat frame one by one and show result
                     


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/flsk/record', methods=['GET'])
def record():
    capture_duration = 10
    timetaken = time.ctime().replace(r':','_')
    namekey = str('video_1' + timetaken)
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('video_1' + timetaken + '.avi',fourcc, 20.0, (640,480))

    start_time = time.time()
    while( int(time.time() - start_time) < capture_duration ):
        ret, frame = camera.read()
        if ret==True:
            frame = cv2.flip(frame,0)
            out.write(frame)
        else:
            break
    uploaded = upload_video_to_aws('video_1' + timetaken + '.avi', 'mainmediabucket', namekey)
    print(uploaded)
    response = jsonify({'namekey': namekey})
    response.headers.add('Access-Control-Allow-Origin', 'localhost')
    print("response")
    print(response)
    return response

@app.route('/flsk/save_snap_to_cloud', methods=['GET'])
def save_snap_to_cloud():
    if camera.isOpened():
        success, frame = camera.read()
        if success:

            frame = apply_timestamp(frame)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            PIL_image = Image.fromarray(np.uint8(frame)).convert('RGB')
            PIL_image.name = "theimg"

            timetaken = time.ctime().replace(r':','_')
            namekey = str('image_1' + timetaken)

            uploaded = upload_to_aws(PIL_image, 'mainmediabucket', namekey)

            print(uploaded)

            response = jsonify({'namekey': namekey})
            response.headers.add('Access-Control-Allow-Origin', 'localhost')
            print("response")
            print(response)
            return response

    return "failed", 200

@app.route('/flsk/save_snap_to_pc', methods=['GET'])
def save_snap_to_pc():
    if camera.isOpened():
        success, frame = camera.read()
        if success:

            frame = apply_timestamp(frame)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            PIL_image = Image.fromarray(np.uint8(frame)).convert('RGB')
            PIL_image.name = "theimg"
            
            timetaken = time.ctime().replace(r':','_')
            #print(timetaken)
            PIL_image.save("snapshot_" + timetaken + ".png")
    return '', 200

camera2 = cv2.VideoCapture(0)

@app.route('/motion')
def detect_motion():
    return render_template('motion.html')

@app.route('/motion_feed')
def motion_feed():
    return Response(gen_motion_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

import threading
static_back = None
 
# List when any moving object appear
motion_list = [ None, None ]
def gen_motion_frames():
    global motion_list
    global static_back
    while True:
        # # Reading frame(image) from video
        # check, frame = camera2.read()
 
        # # Initializing motion = 0(no motion)
        # motion = 0
 
        # # Converting color image to gray_scale image
        # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
        # # Converting gray scale image to GaussianBlur
        # # so that change can be find easily
        # gray = cv2.GaussianBlur(gray, (21, 21), 0)
    
        # # In first iteration we assign the value
        # # of static_back to our first frame
        # if static_back is None:
        #     static_back = gray
        #     continue
    
        # # Difference between static background
        # # and current frame(which is GaussianBlur)
        # diff_frame = cv2.absdiff(static_back, gray)
    
        # # If change in between static background and
        # # current frame is greater than 30 it will show white color(255)
        # thresh_frame = cv2.threshold(diff_frame, 30, 255, cv2.THRESH_BINARY)[1]
        # thresh_frame = cv2.dilate(thresh_frame, None, iterations = 2)
    
        # # Finding contour of moving object
        # cnts,_ = cv2.findContours(thresh_frame.copy(),
        #                 cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        # # Show the total number of contours that were detected

        # if len(cnts) >= 10 and toggle_motion == True:
        #     print("motion detected")
        #     frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        #     PIL_image = Image.fromarray(np.uint8(frame)).convert('RGB')
        #     PIL_image.name = "theimg"
            
        #     timetaken = time.ctime().replace(r':','_')
        #     #print(timetaken)
        #     PIL_image.save("snapshot_" + timetaken + ".png")
        # for contour in cnts:
        #     if cv2.contourArea(contour) < 10000:
        #         continue
        #     motion = 1
    
        #     (x, y, w, h) = cv2.boundingRect(contour)
        #     # making green rectangle around the moving object
        #     cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)
    
        # # Appending status of motion
        # motion_list.append(motion)
    
        # motion_list = motion_list[-2:]
    
        # # Appending Start time of motion
        # if motion_list[-1] == 1 and motion_list[-2] == 0:
        #     print("motion detected")

        # if motion_list[-1] == 0 and motion_list[-2] == 1:
        #     print("hello")
        # Read frame from camera

        #New Code below
        ret1, image_np = camera2.read()

        # Expand dimensions since the model expects images to have shape: [1, None, None, 3]
        image_np_expanded = np.expand_dims(image_np, axis=0)

        # Things to try:
        # Flip horizontally
        # image_np = np.fliplr(image_np).copy()

        # Convert image to grayscale
        # image_np = np.tile(
        #     np.mean(image_np, 2, keepdims=True), (1, 1, 3)).astype(np.uint8)

        input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.float32)
        detections, predictions_dict, shapes = detect_fn(input_tensor)

        label_id_offset = 1
        image_np_with_detections = image_np.copy()

        viz_utils.visualize_boxes_and_labels_on_image_array(
            image_np_with_detections,
            detections['detection_boxes'][0].numpy(),
            (detections['detection_classes'][0].numpy() + label_id_offset).astype(int),
            detections['detection_scores'][0].numpy(),
            category_index,
            use_normalized_coordinates=True,
            max_boxes_to_draw=200,
            min_score_thresh=.30,
            agnostic_mode=False)
 
        ret2, buffer = cv2.imencode(".jpg", image_np_with_detections)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + image_np_with_detections + b'\r\n')  # concat frame one by one and show result


toggle_motion = True
@app.route('/flsk/updatePreferences', methods=['POST', 'GET'])
def updatePreferences():
    global toggle_motion
    if request.method == 'GET':
        pass
    if request.method == 'POST':
        print(type(request.data))
        print(type(request.json))
        print(request.json)
        toggle_motion = request.json["motion"]
        print(toggle_motion)
        return '', 200
    

if __name__ == "__main__":
    app.run(debug=True, threaded = True)

