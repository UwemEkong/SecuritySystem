import { Injectable } from '@angular/core';
import {Image} from "../interfaces/Image";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getAllImages = (): Observable<{id:number, url:String}[]> => {
    return this.httpClient.get<{id:number, url:String}[]>(`api/image/getAllImages`);
  }

}
