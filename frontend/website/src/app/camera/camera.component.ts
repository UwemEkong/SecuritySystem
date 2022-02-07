import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor() { }

  videoRef:any;
  ngOnInit(): void {
    this.videoRef = document.getElementById('video');
    console.log(this.videoRef);
    this.setupCamera();
  }

  setupCamera(){
    navigator.mediaDevices.getUserMedia({
      video:{width:500, height:500},
      audio:false
    }).then(stram =>{
      console.log(stram);
      this.videoRef.srcObject = stram;
    });
  }

}
