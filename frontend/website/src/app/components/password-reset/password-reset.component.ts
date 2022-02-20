import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PasswordServiceService} from "../../services/password-service.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  reset(userData: any) {
    console.log(userData.value.username);
    console.log(userData.value.id);
    this.authService.resetStep({username: userData.value.username, id: userData.value.id});


  }
}
