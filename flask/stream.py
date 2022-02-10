#https://towardsdatascience.com/video-streaming-in-web-browsers-with-opencv-flask-93a38846fe00
#Import necessary libraries
from flask import Flask, render_template, Response
import cv2
import datetime
#Initialize the Flask app
app = Flask(__name__)

camera = cv2.VideoCapture(0)

def gen_frames():
    while camera.isOpened():
        success, frame = camera.read()
        if success:
       
            font = cv2.FONT_HERSHEY_PLAIN
 
            #date and time as variable
            dt = str(datetime.datetime.now())
 
        
            #lay date and time video frame
            frame = cv2.putText(frame, dt,
                            (10, 100),
                            font, 1,
                            (210, 155, 155),
                            4, cv2.LINE_8)
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

if __name__ == "__main__":
    app.run(debug=True)