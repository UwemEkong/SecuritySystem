import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showLoginComponent = true;
  showRegisterComponent = false;

  showSignUp(showEvent: any) {
      this.showLoginComponent = showEvent.showLoginForm;
      this.showRegisterComponent = showEvent.showRegisterForm;
  }

  showLogin(showEvent: any) {
    this.showLoginComponent = showEvent.showLoginForm;
    this.showRegisterComponent = showEvent.showRegisterForm;
}

}
