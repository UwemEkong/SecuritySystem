import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {PreferencesService} from "../../services/preferences.service";
import {Preferences} from "../../interfaces/Preferences";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  @Output()
  dark = new EventEmitter<boolean>();
  darkMode = false;

  loggedIn = false
  loggedFirstname: any

  constructor(
    private router: Router, private auth: AuthService, private pref: PreferencesService) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (this.auth.authenticated && !this.auth.checkedPrefOnLogin) {
        this.pref.getPreferences().subscribe(response => {
          this.darkMode = response.dark;
          this.dark.emit(this.darkMode);
          this.pref.getCurrentUserPreferences();
          this.auth.checkedPrefOnLogin = true;
        })
      }

      if (event.constructor.name === "NavigationEnd") {
        this.loggedIn = this.auth.authenticated;
        this.loggedFirstname = this.auth.loggedInUser.firstname;
      }
    })
  }

  logout() {
    this.auth.logout()
    location.reload()
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.dark.emit(this.darkMode);

    if (this.auth.authenticated)
    {
      let preferences:Preferences = {userid: this.auth.loggedInUser.id, dark: this.darkMode}
      this.pref.editPreferencesDark(preferences);
    }
  }

}
