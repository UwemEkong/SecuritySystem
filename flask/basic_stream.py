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
import matplotlib as mpl
import matplotlib.cm as mtpltcm
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
import websockets
import asyncio

import base64

ACCESS_KEY = 'AKIA2X357CBVPHQAVH2E'
SECRET_KEY = '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'

                                                                
async def transmit(websocket, path):
    print("Client Connected !")
    try :
        cap = cv2.VideoCapture("http://10.100.212.49:8000")

        while cap.isOpened():
            _, frame = cap.read()
            
            encoded = cv2.imencode('.jpg', frame)[1]

            data = str(base64.b64encode(encoded))
            data = data[2:len(data)-1]
            
            await websocket.send(data)
            
    except websockets.connection.ConnectionClosed as e:
        print("Client Disconnected !")


start_server = websockets.serve(transmit, port=5000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()



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


def gen_frames():
 global prevtime
 global toggle_motion
 while camera.isOpened():
        
    # to read frame by frame
    _, img_1 = camera.read()
    _, img_2 = camera.read()

    img_1 = apply_timestamp(img_1)
    ret, buffer = cv2.imencode(".jpg", img_1)
    img_1 = buffer.tobytes()

    yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + img_1 + b'\r\n')  # concat frame one by one and show result




print("Started server on port : ")

