import { Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Router} from "@angular/router";
import { Preferences } from 'src/app/interfaces/Preferences';
import { PreferencesService } from 'src/app/services/preferences.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  fontSize = this.preferencesServices.fontSizeSetting

  constructor(public preferencesServices: PreferencesService, public authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    document.body.style.fontSize = this.fontSize + 'px';
    this.preferencesServices.getPreferences2(this.authService.loggedInUser.id as number)

    // this.preferencesServices.getPreferences().subscribe((response: { dark: boolean; }) => {
    //   this.darkMode = response.dark;
    // })
  }

  removePeriod = this.preferencesServices.removePeriod;
  fontSizeSetting = this.preferencesServices.fontSizeSetting;
  imageSizeSetting = this.preferencesServices.imageSizeSetting;
  videoSizeSetting = this.preferencesServices.videoSizeSetting;
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

  editPreferencesRemove(){
    if (this.removePeriod != undefined)
    {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, remove: this.removePeriod}
      this.preferencesServices.editPreferencesRemove(preferences);
    }
  }
  editPreferencesFontSize(){
    if (this.fontSizeSetting != undefined)
    {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, fontsize: this.fontSizeSetting}
      this.preferencesServices.editPreferencesFontSize(preferences);
    }
  }
  editPreferencesImageSize(){
    if (this.imageSizeSetting != undefined)
    {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, imagesize: this.imageSizeSetting}
      this.preferencesServices.editPreferencesImageSize(preferences);
    }
  }
  editPreferencesVideoSize(){
    if (this.videoSizeSetting != undefined)
    {
      let preferences:Preferences = {userid: this.authService.loggedInUser.id, videosize: this.videoSizeSetting}
      this.preferencesServices.editPreferencesVideoSize(preferences);
    }
  }

  toggleDarkMode() {
    this.preferencesServices.darkModeSetting = !this.preferencesServices.darkModeSetting;

    let preferences:Preferences = {userid: this.authService.loggedInUser.id, dark: this.preferencesServices.darkModeSetting}
    this.preferencesServices.editPreferencesDark(preferences);

    alert("Dark Mode Setting Changed Successfully!!");

    this.router.navigateByUrl('/home');
  }
}
