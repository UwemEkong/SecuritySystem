#https://towardsdatascience.com/video-streaming-in-web-browsers-with-opencv-flask-93a38846fe00
#Import necessary libraries
from flask import Flask, render_template, Response, send_file, jsonify
import cv2
import datetime
import boto3
from botocore.exceptions import NoCredentialsError
from io import BytesIO
from PIL import Image
from matplotlib import cm
import numpy as np
import time

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

#Initialize the Flask app
app = Flask(__name__)

camera = cv2.VideoCapture(0)

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

def gen_frames():
    global motion_list
    global static_back
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

            if len(cnts) >= 10:
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
        
            # Appending Start time of motion
            if motion_list[-1] == 1 and motion_list[-2] == 0:
                print("motion detected")

            if motion_list[-1] == 0 and motion_list[-2] == 1:
                print("hello")
            ret, buffer = cv2.imencode(".jpg", frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result
                   


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/flsk/record', methods=['GET'])
def record():
    capture_duration = 10

    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    out = cv2.VideoWriter('output.avi',fourcc, 20.0, (640,480))

    start_time = time.time()
    while( int(time.time() - start_time) < capture_duration ):
        ret, frame = camera.read()
        if ret==True:
            frame = cv2.flip(frame,0)
            out.write(frame)
        else:
            break
    return '', 200
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
        # Reading frame(image) from video
        check, frame = camera2.read()
 
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

        if len(cnts) >= 10:
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
    
        # Appending Start time of motion
        if motion_list[-1] == 1 and motion_list[-2] == 0:
            print("motion detected")

        if motion_list[-1] == 0 and motion_list[-2] == 1:
            print("hello")
 
        ret, buffer = cv2.imencode(".jpg", frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

# prints if motion detected
def thread_voice_alert(prompt):
    print(prompt)
    print("motion detected")

if __name__ == "__main__":
    app.run(debug=True, threaded = True)