import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authServ: AuthService) { }

  ngOnInit(): void {
  }

  login(userData: any){
    console.log(userData.value.username)
    this.authServ.login({username: userData.value.username, password: userData.value.password});
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
