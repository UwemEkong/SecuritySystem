import { Injectable } from '@angular/core';
import {Feedback} from "../interfaces/Feedback";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient: HttpClient, private router: Router, private http: HttpClient) { }

  create(feedback:Feedback) {
    console.log('CREATING FEEDBACK: ' + JSON.stringify(feedback))
    this.httpClient.post<Feedback>('api/feedback/create', feedback).subscribe(() => {
      this.router.navigateByUrl('/home');
    })
  }

  public getAllFeedback = (): Observable<{id:number, name:String, email:String, question:String, sent:boolean}[]> => {
    return this.httpClient.get<{id:number, name:String, email:String, question:String, sent:boolean}[]>(`api/feedback/getAllFeedback`);
  }

}
