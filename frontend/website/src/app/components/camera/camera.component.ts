import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MediaxService } from 'src/app/services/mediax.service';
import {Mediax} from "../../interfaces/Mediax"
import { AuthService } from 'src/app/services/auth.service';
import {PreferencesService} from "../../services/preferences.service";
import { LocationService } from 'src/app/services/location.service';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor(public mediaxServ: MediaxService, private http: HttpClient, public authService: AuthService, private pref: PreferencesService, public locationService: LocationService) { }

  videoSize = this.pref.videoSizeSetting;
  videoRef:any;
  ngOnInit(): void {
    // this.videoRef = document.getElementById('video');
    // console.log(this.videoRef);
    // this.setupCamera();
    this.authService.getLoggedInUser();
  }

  saveImageToCloud(){
    this.http.get(`http://localhost:4200/flsk/save_snap_to_cloud`).subscribe((data: any) =>  {
      console.log(data);
      let namekey = data["namekey"];
      let mx:Mediax = {filename: namekey, islocal: false, isvideo: false, pathorkey: namekey, userid: 1, location:this.locationService.formattedLocation, timestamp:(new Date().toLocaleString()), isfavorite: false}
      this.mediaxServ.createMediax(mx);
    });
  }

  record() {
    this.http.get(`http://localhost:4200/flsk/record`).subscribe((data: any) =>  {
      let namekey = data["namekey"];
      let mx:Mediax = {filename: namekey, islocal: false, isvideo: true, pathorkey: namekey, userid: this.authService.loggedInUser.id as number, location:this.locationService.formattedLocation , timestamp:(new Date().toLocaleString()), isfavorite: false, shared:false,title:"",category:"",views:0 }
      this.mediaxServ.createMediax(mx);
  });
  }

  saveImage() {
    console.log("hello")
    this.http.get(`http://localhost:4200/flsk/save_snap_to_pc`).subscribe((data: any) =>  {
      console.log(data)
  });
  }

  thermal() {
    this.http.get(`http://localhost:4200/flsk/togglethermal`).subscribe((data: any) =>  {
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
