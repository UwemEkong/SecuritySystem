import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PreferencesService} from "../../services/preferences.service";
import {Router} from "@angular/router";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authServ: AuthService, public preferencesService: PreferencesService, public router: Router, public deviceService: DeviceService) { }

  ngOnInit(): void {
    this.authServ.getLoggedInUser();
    this.deviceService.getAllUserDevices();
  }

}

