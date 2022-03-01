import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Preferences} from "../interfaces/Preferences";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  editPreferences(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferences', preferences).subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }



}
