import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

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



}
