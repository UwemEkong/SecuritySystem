import { Component, Input, OnInit } from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";
import {Preferences} from "../../interfaces/Preferences";
import {AuthService} from "../../services/auth.service";
import * as $ from 'jquery';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(public preferencesServices: PreferencesService, public authService: AuthService) { }
  
  notifylabels: string | undefined;

  ngOnInit(): void {
    try{
      this.preferencesServices.getPreferences2(this.authService.loggedInUser.id as number)
    } finally {
    this.notifylabels = this.preferencesServices.currentUserPrefences.labels
    console.log(this.notifylabels)
    }
  }
  
  deletePeriod = this.preferencesServices.currentUserPrefences.remove
  motionSetting = this.preferencesServices.currentUserPrefences.motion

  
  updateLabels(){
    console.log($("#labelsToNotifyFor").val());
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, labels: String($("#labelsToNotifyFor").val())};
      this.preferencesServices.editPreferences(preferences);
  }
  
  editPreferences(){
    if (this.deletePeriod != undefined)
    {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, remove: this.deletePeriod}
      this.preferencesServices.editPreferencesRemove(preferences);
    }
  }

  toggleMotion(newSetting: boolean) {
    
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, remove: this.deletePeriod, motion: newSetting, dark: false}
      this.preferencesServices.editPreferences(preferences);
    
    this.preferencesServices.getPreferences2(this.authService.loggedInUser.id as number)
    this.preferencesServices.updateFlaskPreferences(preferences)
  }

}
