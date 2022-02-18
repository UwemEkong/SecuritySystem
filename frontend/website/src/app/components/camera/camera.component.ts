import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor(private http: HttpClient) { }

  videoRef:any;
  ngOnInit(): void {
    // this.videoRef = document.getElementById('video');
    // console.log(this.videoRef);
    // this.setupCamera();
  }

  saveImageToCloud(){
    console.log("hi")
    this.http.get(`http://127.0.0.1:5000/save_snap_to_cloud`).subscribe((data:any) => {
      console.log(data);
    });
  }

  saveImage() {
    console.log("hello")
    this.http.get(`http://127.0.0.1:5000/save_snap_to_pc`).subscribe((data: any) =>  {
      console.log(data)
  });
  }

  setupCamera(){
    //navigator.mediaDevices.getUserMedia({
      //video:{width:500, height:500},
      //audio:false
    //}).then(stram =>{
      //console.log(stram);
      //this.videoRef.srcObject = stram;
      //var video = document.querySelector('video');
      //this.videoRef.src = "http://127.0.0.1:5000/video_feed";
      // @ts-ignore
      //video.src = 'http://127.0.0.1:5000/video_feed?'; // just to be sure src does not conflict with us
      // @ts-ignore
      //video.srcObject = localMediaStream;
    // });
  }

}
