import { Injectable } from '@angular/core';
import { User } from "../interfaces/User";
import { Mediax } from "../interfaces/Mediax"
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { Preferences } from "../interfaces/Preferences";
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class MediaxService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  createMediax(mediax: Mediax) {
    this.httpClient.post<Mediax>('api/mediax/createMediax', mediax).subscribe(() => {
      this.router.navigateByUrl('/records');
    })
  }

  deleteMediax(mediax: Mediax) {
    this.httpClient.post<Mediax>('api/mediax/deleteMediax', mediax).subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }

  getAllMediax(): Observable<Mediax[]> {
    return this.httpClient.get<Mediax[]>('api/mediax/getAllMediax')
  }

  getUserMediax(deviceId: string): Observable<Mediax[]> {
    console.log(deviceId)
    if (deviceId == "" || deviceId == null) {
      return this.httpClient.get<Mediax[]>(`api/mediax/getUserMediax`)
    } else {
      return this.httpClient.get<Mediax[]>(`api/mediax/getUserMediaxByDeviceId/${deviceId}`)
    }
  }

  listOfMediax: Mediax[] = [];
  updateUserMediax() {
    this.httpClient.get<Mediax[]>(`api/mediax/getUserMediax`).subscribe((data) => {
      this.listOfMediax = data
    })
  }

  editMediax(mediax: Mediax) {
    this.httpClient.post<Mediax>('api/mediax/editMediax', mediax).subscribe(() => {
      this.router.navigateByUrl('/records');
    })
  }

  editShared(mediax: Mediax, deviceId:string) {
    this.httpClient.post<Mediax>('api/mediax/editShared', mediax).subscribe(() => {
      if (!deviceId) {
        this.router.navigateByUrl('/records');
      } else {
        this.router.navigateByUrl(`/records/${deviceId}`);
      }
    })
  }

  editViews(mediax: Mediax) {
    return this.httpClient.post<Mediax>('api/mediax/editViews', mediax);
  }


  unshareMedia(mediax: Mediax): Observable<Mediax> {
    return this.httpClient.post<Mediax>('api/mediax/editShared', mediax)
  }

  allSharedMediax: Mediax[] = [];
  getAllSharedMediax() {
    this.httpClient.get<Mediax[]>('api/mediax/getAllSharedMediax').subscribe((data) => {
      this.allSharedMediax = data
      console.log(data)
    })
  }

  getAllSharedMediaxObservable() {
    return this.httpClient.get<Mediax[]>('api/mediax/getAllSharedMediax');
  }

  getAllSharedMediaxFiltered(searchRadius:number) {
    this.httpClient.get<Mediax[]>(`api/mediax/getAllSharedMediaxFiltered/${searchRadius}`).subscribe((data) => {
      this.allSharedMediax = data
      console.log("FILTERED DATA: ",data)
    })
  }

  getAllSharedMediaxFilteredObservable(searchRadius:number) {
    return this.httpClient.get<Mediax[]>(`api/mediax/getAllSharedMediaxFiltered/${searchRadius}`);
  }
}
