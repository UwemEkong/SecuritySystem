import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PrefService} from "../../services/pref.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authServ: AuthService, public prefServ: PrefService) { }

  ngOnInit(): void {
    this.authServ.getLoggedInUser();
    this.prefServ.getUserPrefs();
  }

  updatePrefs(preferenceData: any) {
    this.prefServ.editUserPrefs(preferenceData);

  }


}
