import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";
import {Preferences} from "../../interfaces/Preferences";
import {AuthService} from "../../services/auth.service";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {Router} from "@angular/router";

@Component({
  providers:[NavigationBarComponent],
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  @Output()
  dark = new EventEmitter<boolean>();

  fontSize = this.preferencesServices.fontSizeSetting

  constructor(public preferencesServices: PreferencesService, public authService: AuthService, private navigation: NavigationBarComponent, private router: Router) { }


  ngOnInit(): void {
    document.body.style.fontSize = this.fontSize + 'px';
    this.preferencesServices.getPreferences2(this.authService.loggedInUser.id as number)
  }

  removePeriod = this.preferencesServices.removePeriod;
  fontSizeSetting = this.preferencesServices.fontSizeSetting;
  imageSizeSetting = this.preferencesServices.imageSizeSetting;
  videoSizeSetting = this.preferencesServices.videoSizeSetting;

  deletePeriod = this.preferencesServices.currentUserPrefences.remove
  motionSetting = this.preferencesServices.currentUserPrefences.motion


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
    this.preferencesServices.getPreferences().subscribe(response => {

      let darkMode = response.dark;

      let preferences:Preferences = {userid: this.authService.loggedInUser.id, dark: !darkMode}
      this.preferencesServices.editPreferencesDark(preferences);

      this.dark.emit(!darkMode);

      alert("Dark Mode Setting Changed Successfully!!");

      setTimeout(() =>
        {
          this.router.navigate(['/home']);
        },
        100);
    })
  }



}
