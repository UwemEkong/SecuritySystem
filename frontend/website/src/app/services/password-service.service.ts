import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class PasswordServiceService {

  constructor(private httpClient: HttpClient, private router: Router) { }


  reset(userData: any) {
    this.httpClient.post<String>('api/auth/forgot-password', userData).subscribe(() => {

    })

  }
}
