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
    console.log(userData.value.email);
    this.authService.resetStep({email: userData.value.email});


  }
}
