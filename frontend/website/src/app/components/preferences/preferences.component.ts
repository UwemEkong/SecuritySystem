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

  constructor(public preferencesServices: PreferencesService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  removePeriod: 0 | undefined


  editPreferences(){
    if (this.removePeriod != undefined)
    {
      let preferences:Preferences = {userid: this.auth.loggedInUser.id, remove: this.removePeriod}
      this.preferencesServices.editPreferencesRemove(preferences);
    }

  }



}
