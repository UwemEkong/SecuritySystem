#https://towardsdatascience.com/video-streaming-in-web-browsers-with-opencv-flask-93a38846fe00
#Import necessary libraries
import threading
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

import requests
from urllib.parse import quote

import os
import tarfile
import urllib.request
import json
import subprocess
import sys

ACCESS_KEY = 'AKIA2X357CBVPHQAVH2E'
SECRET_KEY = '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'

                                                                
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

import socket
from contextlib import closing
   
def check_socket(host, port):
    with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
        if sock.connect_ex((host, port)) == 0:
            print("Port is open")
            return True
        else:
            print("Port is not open")
            return False

def scan_for_cam():
    # scan for all devices on network
    addresses = subprocess.check_output(['arp', '-a'])
    print("Addresses")
    print(addresses)
    # decode 
    # jetson unique part of mac
    addresses = addresses.decode("utf-8")
    print("Addresses decoded")
    print(addresses)
    #mac address of jetson...will be changed to just first 4 digits so all jetsons can be recognized as if they were cameras only
    jetsonMacID = '34:13:e8:63:59:7a'
    flaskStream = ''

    networkAdds = addresses.splitlines()
    print("Network add splitlines")
    print(networkAdds)

    # networkAdds = set(add.split(None,2)[1] for add in networkAdds if add.strip())

    for add in networkAdds:
        splitAdds = add.split()
        print("ADD")
        print(add)
        print("SPLIT")
        print(splitAdds)

        # macID = macArr[0] + ':' + macArr[1]
        if len(splitAdds) > 3 and splitAdds[3] == jetsonMacID:
            # ip = splitting[1]
            flaskStream = splitAdds[1].replace('(', '')
            finFlaskStream = flaskStream.replace(')', '')
            print(finFlaskStream)
            return finFlaskStream
        

def get_camera():
    global camera
    
    # is_port_open = check_socket('10.100.212.46', 8000)
    device_address = scan_for_cam()

    if device_address is not None:
        camera = cv2.VideoCapture("http://" + device_address + ':8000')

    if not camera.isOpened():
        camera = cv2.VideoCapture(0)

camera = cv2.VideoCapture(0)
get_camera()


def gen_frames():
 global prevtime
 global toggle_motion
 while camera.isOpened():
        
    # to read frame by frame
    _, img_1 = camera.read()
    _, img_2 = camera.read()

    # find difference between two frames
    diff = cv2.absdiff(img_1, img_2)

    # to convert the frame to grayscale
    diff_gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    # apply some blur to smoothen the frame
    diff_blur = cv2.GaussianBlur(diff_gray, (5, 5), 0)

    # to get the binary image
    _, thresh_bin = cv2.threshold(diff_blur, 20, 255, cv2.THRESH_BINARY)

    # to find contours
    contours, hierarchy = cv2.findContours(thresh_bin, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    # to draw the bounding box when the motion is detected
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        if cv2.contourArea(contour) > 300 and toggle_motion == True:
            cv2.rectangle(img_1, (x, y), (x+w, y+h), (0, 255, 0), 2)

            if allow_motion_detection() == True:
                prevtime = time.time()
                print("motion detected")      
                img_1 = cv2.cvtColor(img_1, cv2.COLOR_BGR2RGB)
                PIL_image = Image.fromarray(np.uint8(img_1)).convert('RGB')
                PIL_image.name = "theimg"
                timetaken = time.ctime().replace(r':','_')
                PIL_image.save("snapshot_" + timetaken + ".png")
                labels = get_aws_rekognition_labels("snapshot_" + timetaken + ".png")
                notify_user(labels)
    img_1 = apply_timestamp(img_1)
    ret, buffer = cv2.imencode(".jpg", img_1)
    img_1 = buffer.tobytes()
    yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img_1 + b'\r\n')  # concat frame one by one and show result

prevtime = time.time()
first_detection = True



# Checks if 10 seconds have passed since the last motion detection
# Checks if this is the first time motion has been detection since the app loaded up
# Checks if user has "motion" user preference set to true
# If all of the above checks are true, then the function returns true
def allow_motion_detection():
    global first_detection
    global prevtime
    global toggle_motion
    if toggle_motion == True and first_detection == True or  toggle_motion == True and time.time() - prevtime > 10:
        first_detection = False
        return True
    return False

def notify_user(labels):

    HEADERS = {
                'Access-Control-Allow-Origin': 'localhost'
            }

    response = requests.get('http://localhost:8080/api/preferences/getLabelsList', headers=HEADERS)
    
    print("USER LABELS")
    userlabels = response.content.decode('utf-8').split(",")
    print(userlabels)
    # print("LABLES")
    # print(labels)

    labelstrings = []

    for label in labels:
        labelstrings.append(label['Name'].lower())


    print('labelstrings')
    print(labelstrings)

    for l in labelstrings:
        
        if l in userlabels:

            print("user notified")
            send_email_report("Big Brother detected a " + l + ". The following was also detected at the same time: " + ", ".join(labelstrings))


def send_email_report(report):
    HEADERS = {
                'Access-Control-Allow-Origin': 'localhost'
            }

    response = requests.get('http://localhost:8080/api/auth/report/{}'.format(report), headers=HEADERS)
    print(response)

aws_rekognition_active = False
def get_aws_rekognition_labels(image_file_path):
    global aws_rekognition_active
    aws_rekognition_active = True
    client=boto3.client('rekognition', region_name='us-east-1', aws_access_key_id=ACCESS_KEY,aws_secret_access_key=SECRET_KEY)
   
    with open(image_file_path, 'rb') as image:
        response = client.detect_labels(Image={'Bytes': image.read()})
        
    print('Detected labels in ' + image_file_path)    
    for label in response['Labels']:
        print (label['Name'] + ' : ' + str(label['Confidence']))
    aws_rekognition_active = False
    return response['Labels']

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

#camera2 = cv2.VideoCapture("http://10.100.212.46:8000")

import threading
static_back = None
 
# List when any moving object appear
motion_list = [ None, None ]


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

