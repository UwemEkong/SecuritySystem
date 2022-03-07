import { Component, OnInit } from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";
import {Preferences} from "../../interfaces/Preferences";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(public preferencesServices: PreferencesService, public httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  deletePeriod: 0 | undefined
  text = "On"

  toggleMotion() {
    if (this.text == "On") {
      this.text = "Off"
      this.httpClient.get(`http://localhost:4200/flsk/toggleMotionOff`).subscribe((data: any) =>  {
        console.log(data)
    });
    } else {
      this.text = "On"
      this.httpClient.get(`http://localhost:4200/flsk/toggleMotionOn`).subscribe((data: any) =>  {
        console.log(data)
    });
    }
  }

  editPreferences(){
    let preferences:Preferences = {userid: 1, remove: this.deletePeriod, motion: true, dark: false}
    this.preferencesServices.editPreferences(preferences);
  }



}
