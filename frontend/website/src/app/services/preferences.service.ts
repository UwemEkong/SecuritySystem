import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Preferences} from "../interfaces/Preferences";
import {Observable} from "rxjs";

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


}
