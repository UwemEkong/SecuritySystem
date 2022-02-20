import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Preference} from "../interfaces/Preference";
import {User} from "../interfaces/User";


@Injectable({
  providedIn: 'root'
})
export class PrefService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }
  loggedInUserPrefs = <Preference>{};

  getUserPrefs() {
    this.httpClient.get<Preference>('api/auth/getUserPreferences').subscribe((data) => {
      console.log("User data " + JSON.stringify(data))
      this.loggedInUserPrefs = data
    })
  }

  editUserPrefs(prefs:Preference) {
    this.httpClient.post<Preference>('api/auth/editPreferences', prefs).subscribe(() => {
      this.getUserPrefs();
    })
  }

}
