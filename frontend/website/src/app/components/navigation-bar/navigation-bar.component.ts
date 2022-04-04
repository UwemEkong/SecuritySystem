import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PreferencesService} from "../../services/preferences.service";
import { LocationService } from 'src/app/services/location.service';
import { MediaxService } from 'src/app/services/mediax.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Output()
  dark = new EventEmitter<boolean>();

  loggedIn = false
  loggedFirstname: any

  constructor(
    private router: Router, private auth: AuthService, private pref: PreferencesService, public locationService: LocationService, private mediaxService: MediaxService) {
  }

  ngDoCheck() {
    this.loggedIn = this.auth.authenticated;
    this.loggedFirstname = this.auth.loggedInUser.firstname;
    if (this.auth.authenticated) {
      this.dark.emit(this.pref.darkModeSetting);
    }
  }

  ngOnInit() {
    this.auth.getLoggedInUser()
    this.loggedIn = this.auth.authenticated
    this.locationService.initializeUserPosition()
  }

  logout() {
    this.auth.logout()
    location.reload()
  }
}
