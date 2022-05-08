import cv2
import time
import io
import threading
from flask import Response, Flask,request, send_file, jsonify, redirect, url_for
import datetime
import boto3
from botocore.exceptions import NoCredentialsError
from io import BytesIO
from PIL import Image
import numpy as np
import time
import requests
#from urlparse import urlparse, parse_qs
import jetson.inference
import jetson.utils
import os
import tarfile
import urllib
import pytz
from getmac import get_mac_address as gma




ACCESS_KEY = 'AKIA2X357CBVPHQAVH2E'
SECRET_KEY = '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'
timezone = pytz.timezone('US/Central')




def upload_video_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,aws_secret_access_key=SECRET_KEY)
   
    try:
        s3.upload_file(local_file, bucket, s3_file, ExtraArgs={'ContentType': "video/ogg"})
        print("upload success")
        return True
    except FileNotFoundError:
        print("FILE NOT FOUND")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False


 

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

def notify_users():
    print("user notified")
    send_email_report("a person")


def notify_users_car():
    print("user notified")
    send_email_report("a car")


def notify_users_dog():
    print("user notified")
    send_email_report("a dog")


def get_mac():
    print( gma() )
    return gma()

def send_email_report(report):
    if cap.isOpened():
        success, frame = cap.read()
        if success:
            font = cv2.FONT_HERSHEY_DUPLEX
 
           #date and time as variable
            dt = str(datetime.datetime.now(tz = timezone))
            color = (0, 0, 0)
            frame = cv2.putText(frame, dt,
                    (10, 100),
                    font, 1,
                    color,
                    4, cv2.LINE_8)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            PIL_image = Image.fromarray(np.uint8(frame)).convert('RGB')
            PIL_image.name = "theimg"

            timetaken = time.ctime().replace(r':','_')
            namekey = str('image_1' + timetaken)

            uploaded = upload_to_aws(PIL_image, 'mainmediabucket', namekey)
            HEADERS = {
                  'Access-Control-Allow-Origin': '*'
             }  
            response = requests.get('http://10.0.0.192:8080/api/auth/report/{}/{}/{}'.format(report, get_mac(), namekey), headers=HEADERS)   
   
    



# Create the Flask object for the application
app = Flask(__name__)
camera_id = "/dev/video1"
cap = cv2.VideoCapture(camera_id, cv2.CAP_V4L2)
cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'YUYV'))
cap.set(3,640)
cap.set(4,480)
net = jetson.inference.detectNet("ssd-mobilenet-v2", threshold=0.5)

capture_motion = True
def captureFrames():

    global total_time
    global initial_time
    global capture_motion
    while True and cap.isOpened():
        return_key, frame = cap.read()
        if ((type(frame).__module__ == np.__name__) == True):
            bgr_img = jetson.utils.cudaFromNumpy(frame, isBGR=True)

            rgb_img = jetson.utils.cudaAllocMapped(width=bgr_img.width, height=bgr_img.height, format='rgb8')
            jetson.utils.cudaConvertColor(bgr_img, rgb_img)
            if time.time() - initial_time < 30:
               total_time = time.time() - initial_time
            #print(total_time)
            if allow_motion(total_time, initial_time) == True:
                detections = net.Detect(rgb_img)
                for detection in detections:
                    print("MOTION TOGGLE IN LOOP")
                    print(capture_motion)
                    print(type(capture_motion))
                    if (detection.ClassID == 1 and capture_motion == True):
                        total_time = time.time()
                        initial_time = time.time()
                        print("PERSON DETECTED")
                        notify_users()
                    if (detection.ClassID == 3 and capture_motion == True):
                        total_time = time.time()
                        initial_time = time.time()
                        print("CAR DETECTED")
                        notify_users_car()
                    if (detection.ClassID == 18 and capture_motion == True):
                        total_time = time.time()
                        initial_time = time.time()
                        print("DOG DETECTED")
                        notify_users_dog()
       
        if not return_key:
            break
        else:
            frame = thermalizeFrame(frame)
            font = cv2.FONT_HERSHEY_DUPLEX
 
           #date and time as variable
            dt = str(datetime.datetime.now(tz = timezone))
            color = (0, 0, 0)

           #lay date and time video frame
            frame = cv2.putText(frame, dt,
                    (10, 100),
                    font, 1,
                    color,
                    4, cv2.LINE_8)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
        # Output image as a byte array
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        key = cv2.waitKey(30) & 0xff
        if key == 27:
            break
 

initial_time = time.time()
total_time = time.time()
def allow_motion(total_time, initial_time):
    if total_time >= 29:
        return  True
    return False

@app.route("/")
def streamFrames():
    return Response(captureFrames(), mimetype = "multipart/x-mixed-replace; boundary=frame")



toggle_thermal = False
@app.route('/flsk/togglethermal', methods=['GET'])
def toggleThermalPreference():
    global toggle_thermal
    toggle_thermal = not toggle_thermal
    return '',200

# Frame should be np array
def thermalizeFrame(frame):
    global toggle_thermal
    if (not toggle_thermal):
        return frame
    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
   
    blur = cv2.GaussianBlur(gray,(15,15),0)
    colormapped_image = cv2.applyColorMap(blur, cv2.COLORMAP_JET)

    return colormapped_image


@app.route('/flsk/record', methods=['GET'])
def record():
    capture_duration = 20
    timetaken = time.ctime().replace(r':','_')
    namekey = str('video_1' + timetaken)
    fourcc = cv2.VideoWriter_fourcc(*'theo')
    out = cv2.VideoWriter('video_1' + timetaken + '.ogg', fourcc, 12.0, (640,480))

    start_time = time.time()
    print("before loop")
    while( int(time.time() - start_time) < capture_duration ):
        cv2.waitKey(4)
        ret, frame = cap.read()
        if ret==True:
            #frame = cv2.flip(frame,0)
            font = cv2.FONT_HERSHEY_DUPLEX
 
           #date and time as variable
            dt = str(datetime.datetime.now(tz = timezone))
            color = (0, 0, 0)
            frame = cv2.putText(frame, dt,
                    (10, 100),
                    font, 1,
                    color,
                    4, cv2.LINE_8)
            out.write(frame)
            #print("wrote frame")
        else:
            break
    print("uploading")
    uploaded = upload_video_to_aws('video_1' + timetaken + '.ogg', 'mainmediabucket', namekey)
    print(uploaded)
    response = jsonify({'namekey': namekey})
    response.headers.add('Access-Control-Allow-Origin', '*')
    print("response")
    print(response)
    return response

@app.route('/flsk/save_snap_to_cloud', methods=['GET'])
def save_snap_to_cloud():
    if cap.isOpened():
        success, frame = cap.read()
        if success:
            font = cv2.FONT_HERSHEY_DUPLEX
 
           #date and time as variable
            dt = str(datetime.datetime.now(tz = timezone))
            color = (0, 0, 0)
            frame = cv2.putText(frame, dt,
                    (10, 100),
                    font, 1,
                    color,
                    4, cv2.LINE_8)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            PIL_image = Image.fromarray(np.uint8(frame)).convert('RGB')
            PIL_image.name = "theimg"

            timetaken = time.ctime().replace(r':','_')
            namekey = str('image_1' + timetaken)

            uploaded = upload_to_aws(PIL_image, 'mainmediabucket', namekey)

            print(uploaded)

            response = jsonify({'namekey': namekey})
            response.headers.add('Access-Control-Allow-Origin', '*')
            print("response")
            print(response)
            return response

    return "failed", 200


@app.route('/flsk/setMotionCapture/<motionactive>', methods=['GET'])
def setMotionCapture(motionactive):
    print("INSIDE SET MOTION CAPTURE")
    global capture_motion
    print("MOTION ACTIVE")
    print(motionactive)
    print(capture_motion)
    capture_motion = eval(motionactive.title())
    response = jsonify({'test': 'testresponse'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    print(response)
    return response



if __name__ == '__main__':

 
    # start the Flask Web Application
    # While it can be run on any feasible IP, IP = 0.0.0.0 renders the web app on
    # the host machine's localhost and is discoverable by other machines on the same network
    app.run("0.0.0.0", port="8000")
