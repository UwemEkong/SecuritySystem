import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authServ: AuthService) { }

  ngOnInit(): void {
  }
  register(userData: any) {
    this.authServ.register({firstname: userData.value.firstname, lastname: userData.value.lastname, email: userData.value.email, username: userData.value.username, password: userData.value.password});
  }

  @Output() loginEmitter = new EventEmitter<any>();

  showLogin(){
    this.loginEmitter.emit({showRegisterForm: false, showLoginForm:true})
  }
}
