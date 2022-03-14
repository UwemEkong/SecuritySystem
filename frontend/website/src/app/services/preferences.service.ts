import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Preferences} from "../interfaces/Preferences";
import {Observable} from "rxjs";
import { AuthService } from './auth.service';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  editPreferencesRemove(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesRemove', preferences).subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }

  editPreferencesDark(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesDark', preferences).subscribe(() => {
    })
  }

  editPreferencesMotion(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesMotion', preferences).subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }

  public getPreferences = (): Observable<{ id: number, userid: number, remove: number, motion:boolean, dark:boolean}> => {
    return this.httpClient.get<{ id: number, userid: number, remove: number, motion:boolean, dark:boolean }>(`api/preferences/getPreferences`);
  }

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
