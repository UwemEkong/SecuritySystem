import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authServ: AuthService, private router: Router) { }
  ngOnInit(): void {
  }
  numAttempts = 0;
  login(userData: any){
    this.numAttempts = this.numAttempts + 1;
    console.log(userData.value.username + this.numAttempts)
    this.authServ.login({username: userData.value.username, password: userData.value.password});
    if (this.numAttempts >= 5) {
    this.router.navigateByUrl('/password-reset')
    }
  }
  usernamePlaceholder = "Username"
  passwordPlaceholder = "Password"
  @Output() registerEmitter = new EventEmitter<any>();
  showRegister() {
    this.registerEmitter.emit({showRegisterForm: true, showLoginForm:false})
  }

  clearUsername() {
    this.usernamePlaceholder = ""
  }

  clearPassword() {
    this.passwordPlaceholder = ""
  }

}
