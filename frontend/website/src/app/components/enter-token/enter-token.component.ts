import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-enter-token',
  templateUrl: './enter-token.component.html',
  styleUrls: ['./enter-token.component.scss']
})
export class EnterTokenComponent implements OnInit {
  tokenPlaceholder = "Enter reset token";
  usernamePlaceholder = "Enter username";

  constructor(public authServ: AuthService) { }

  ngOnInit(): void {
  }

  clearToken() {
    this.tokenPlaceholder = ""
  }
  clearUsername() {
    this.usernamePlaceholder = ""
  }


  tokenCheck(userData: any) {

      console.log(userData.value.token)
      this.authServ.tokenStep({username: userData.value.username, resetToken: userData.value.token});

  }
}
