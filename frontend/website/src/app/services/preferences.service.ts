import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  removePeriod = 0;
  fontSizeSetting = 14;
  imageSizeSetting = 300;
  videoSizeSetting = 300;
  darkModeSetting = false;


  editPreferencesRemove(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesRemove', preferences).subscribe(() => {
      this.getCurrentUserPreferences();
      alert("Media Clear Time Changed Successfully!!");

    })
  }

  editPreferencesDark(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesDark', preferences).subscribe(() => {
      this.getCurrentUserPreferences();
      // alert("Font Size Changed Successfully!!");
    })
  }

  editPreferencesMotion(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesMotion', preferences).subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }

  editPreferencesFontSize(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesFontSize', preferences).subscribe(() => {
      this.getCurrentUserPreferences();
      alert("Font Size Changed Successfully!!");

    })
  }

  editPreferencesImageSize(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesImageSize', preferences).subscribe(() => {
      this.getCurrentUserPreferences();
      alert("Image Size Changed Successfully!!");
    })

  }

  editPreferencesVideoSize(preferences:Preferences) {
    this.httpClient.post<Preferences>('api/preferences/editPreferencesVideoSize', preferences).subscribe(() => {
      this.getCurrentUserPreferences();
      alert("Video Size Changed Successfully!!");

    })
  }

  public getPreferences = (): Observable<{ id: number, userid: number, remove: number, motion:boolean, dark:boolean, fontsize:number, imagesize:number, videosize:number}> => {
    return this.httpClient.get<{ id: number, userid: number, remove: number, motion:boolean, dark:boolean, fontsize:number, imagesize:number, videosize:number }>(`api/preferences/getPreferences`);

  }


  currentUserPrefences = <Preferences>{};

  editPreferences(preferences:Preferences) {
    console.log(preferences);
    this.httpClient.post<Preferences>('api/preferences/editPreferences', preferences).subscribe(() => {

    })
  }

  getPreferences2(userId: number) {
    this.httpClient.get<Preferences>(`api/preferences/getPreferences/${userId}`).subscribe((data: Preferences) => {
      this.currentUserPrefences = data;
      console.log(this.currentUserPrefences)
    })
  }

  public getCurrentUserPreferences()
  {
    this.getPreferences().subscribe(response =>{
      this.removePeriod = response.remove;
      this.fontSizeSetting = response.fontsize;
      this.imageSizeSetting = response.imagesize;
      this.videoSizeSetting = response.videosize;
      this.darkModeSetting = response.dark;
    })
  }
  updateFlaskPreferences(preferences: Preferences) {
    this.httpClient.post<Preferences>('http://localhost:4200/flsk/updatePreferences', preferences).subscribe(() => {
    })
  }

}
