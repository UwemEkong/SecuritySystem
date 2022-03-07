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

  constructor(public preferencesServices: PreferencesService, public authServices: AuthService) { }

  ngOnInit(): void {
  }

  deletePeriod: 0 | undefined


  editPreferences(){
    if (this.deletePeriod != undefined)
    {
      let preferences:Preferences = {userid: this.authServices.loggedInUser.id, remove: this.deletePeriod, motion: true, dark: false}
      this.preferencesServices.editPreferences(preferences);
    }

  }



}
