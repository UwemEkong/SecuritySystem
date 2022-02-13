#https://towardsdatascience.com/video-streaming-in-web-browsers-with-opencv-flask-93a38846fe00
#Import necessary libraries
from flask import Flask, render_template, Response
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
        s3.upload_fileobj(in_mem_file, 'mainmediabucket', s3_file_name)
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
    while camera.isOpened():
        success, frame = camera.read()
        if success:
       
            frame = apply_timestamp(frame)

        if not success:
            break
        else:
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

@app.route('/save_snap_to_cloud')
def save_snap_to_cloud():
    if camera.isOpened():
        success, frame = camera.read()
        if success:

            frame = apply_timestamp(frame)

            PIL_image = Image.fromarray(np.uint8(frame)).convert('RGB')
            PIL_image.name = "theimg"

            uploaded = upload_to_aws(PIL_image, 'mainmediabucket', str('image_1' + time.ctime()))

            print(uploaded)

    return '', 200


if __name__ == "__main__":
    app.run(debug=True)