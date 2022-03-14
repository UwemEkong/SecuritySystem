import { Component, OnInit } from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";
import {Preferences} from "../../interfaces/Preferences";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(public preferencesServices: PreferencesService, public authService: AuthService) { }


  ngOnInit(): void {
    this.preferencesServices.getPreferences2(this.authService.loggedInUser.id as number)
  }
  
  deletePeriod = this.preferencesServices.currentUserPrefences.remove
  motionSetting = this.preferencesServices.currentUserPrefences.motion

  editPreferences(){
    if (this.deletePeriod != undefined)
    {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, remove: this.deletePeriod}
      this.preferencesServices.editPreferencesRemove(preferences);
    }
  }

  toggleMotion(newSetting: boolean) {
    if (newSetting == true) {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, remove: this.deletePeriod, motion: false, dark: false}
      this.preferencesServices.editPreferences(preferences);
    } else {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, remove: this.deletePeriod, motion: true, dark: false}
      this.preferencesServices.editPreferences(preferences);
    }
    this.preferencesServices.getPreferences2(this.authService.loggedInUser.id as number)
    this.preferencesServices.updateFlaskPreferences()
  }

}
