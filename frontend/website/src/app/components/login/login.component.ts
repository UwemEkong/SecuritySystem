import { Component, OnInit } from '@angular/core';
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

}
