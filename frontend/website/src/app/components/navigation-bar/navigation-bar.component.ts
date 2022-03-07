import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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
    private router: Router, private auth:AuthService){}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.loggedIn = this.auth.authenticated;
        this.loggedFirstname = this.auth.loggedInUser.firstname;
      }
    })
  }

  logout()
  {
    this.auth.logout()
    location.reload()
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.dark.emit(this.darkMode);
  }

}
