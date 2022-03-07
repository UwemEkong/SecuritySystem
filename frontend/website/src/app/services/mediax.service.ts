import { Injectable } from '@angular/core';
import {User} from "../interfaces/User";
import {Mediax} from "../interfaces/Mediax"
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaxService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  createMediax(mediax:Mediax) {
    this.httpClient.post<Mediax>('api/mediax/createMediax', mediax).subscribe(() => {
      this.router.navigateByUrl('/records');
    })
  }

  deleteMediax(mediax:Mediax) {
    this.httpClient.post<Mediax>('api/mediax/deleteMediax', mediax).subscribe(() => {
      this.router.navigateByUrl('/');
    })
  }

  getAllMediax():Observable<Mediax[]>{
    return this.httpClient.get<Mediax[]>('api/mediax/getAllMediax')
  }

  getUserMediax():Observable<Mediax[]>{
    return this.httpClient.get<Mediax[]>('api/mediax/getUserMediax')
  }

  editMediax(mediax:Mediax) {
    this.httpClient.post<Mediax>('api/mediax/editMediax', mediax).subscribe(() => {
      this.router.navigateByUrl('/records');
    })
  }


}
