import { Component, OnInit } from '@angular/core';
import {PreferencesService} from "../../services/preferences.service";
import {Preferences} from "../../interfaces/Preferences";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor(public preferencesServices: PreferencesService) { }

  ngOnInit(): void {
  }

  deletePeriod: 0 | undefined


  editPreferences(){
    let preferences:Preferences = {userid: 1, remove: this.deletePeriod, motion: true, dark: false}
    this.preferencesServices.editPreferences(preferences);
  }



}
