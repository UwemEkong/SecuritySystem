import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';
import { User} from "../../interfaces/User";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public authServ: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  changePassword(userData: any) {
      // this.router.navigate(['home']);
      console.log(this.authServ.loggedInUser.username);
     this.authServ.editUser({username: this.authServ.loggedInUser.username, password: userData.value.password});
  }

}
