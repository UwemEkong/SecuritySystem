import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PreferencesService} from "../../services/preferences.service";

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
    private router: Router, private auth: AuthService, private pref: PreferencesService) {
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
  }

  logout() {
    this.auth.logout()
    location.reload()
  }
}
