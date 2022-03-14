import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Preferences} from "../interfaces/Preferences";
import { AuthService } from './auth.service';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  currentUserPrefences = <Preferences>{};
  
  editPreferences(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferences', preferences).subscribe(() => {

    })
  }

  getPreferences(userId: number) {
    this.httpClient.get<Preferences>(`api/preferences/getPreferences/${userId}`).subscribe((data: Preferences) => {
      this.currentUserPrefences = data;
      console.log(this.currentUserPrefences)
    })
  }

  updateFlaskPreferences() {
    this.httpClient.post<Preferences>('http://localhost:4200/flsk/updatePreferences', this.currentUserPrefences).subscribe(() => {
   
    })
  }

}
