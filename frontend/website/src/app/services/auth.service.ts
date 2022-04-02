import { Injectable } from '@angular/core';
import {User} from "../interfaces/User";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {PreferencesService} from "./preferences.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router, private pref: PreferencesService) { }

  authenticated = false;
  error = "";
  selectedImage = "";
  loggedInUser = <User>{};

  logout() {
    this.httpClient.get(`api/auth/logout`).subscribe((data: User) => {
      this.loggedInUser = data
      console.log(data)
    })
    this.authenticated = false;
    this.router.navigateByUrl('/');
  }


  login(user:User) {
    let failedAttempts = 0;
    this.httpClient.get<User>(`api/auth/login/${user.username}/${user.password}`).subscribe((data: User) => {
      console.log(data)
      if (data.username) {
        this.authenticated = true;
        console.log("User data " + JSON.stringify(data))
        this.loggedInUser = data

        this.pref.getCurrentUserPreferences();

        this.router.navigateByUrl('/home');
      } else {
        failedAttempts = failedAttempts + 1;
        if(failedAttempts = 5) {
          this.router.navigateByUrl('/password-reset')
        }
        this.authenticated = false;
        console.log("User data " + JSON.stringify(data) + failedAttempts)
      }
    })
  }

  register(user:User) {
    console.log('REGISTERING USER: ' + JSON.stringify(user))

    this.httpClient.post<User>('api/auth/register', user).subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }

  getLoggedInUser() {
    this.httpClient.get<User>('api/auth/getloggedinuser').subscribe((data) => {
      if (Object.keys(data).length == 0) {
        this.authenticated = false
      } else {
        console.log("User data " + JSON.stringify(data))
        this.authenticated = true
      }
      this.loggedInUser = data
    })
  }

  editUser(user:User) {
    console.log('user info: ' + JSON.stringify(user));
    this.httpClient.post<User>('api/auth/edituser', user).subscribe(() => {
    })
    this.router.navigateByUrl('/login');
  }

  resetStep(user:User) {
    this.httpClient.get<User>(`api/auth/forgot-password/${user.email}`).subscribe((data: User) => {
      console.log(data)
      if (data.username) {
        this.authenticated = true;
        console.log("User data " + JSON.stringify(data))
        this.loggedInUser = data
        this.router.navigateByUrl('/enter-token');
      } else {
        this.authenticated = false;
      }
    })
  }

  tokenStep(user:User) {
    this.httpClient.get<User>(`api/auth/forgot-password/${user.username}/${user.resetToken}`).subscribe((data: User) => {
      console.log(data)
      if (data.username) {
        this.authenticated = true;
        console.log("User data " + JSON.stringify(data))
        this.loggedInUser = data
        this.router.navigateByUrl('/change-password');
      } else {
        this.authenticated = false;
      }
    })
  }

}
