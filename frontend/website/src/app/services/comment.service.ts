import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Comment } from '../interfaces/Comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(public httpClient:HttpClient) { }

  mediaxComments = new Array<Comment>();

  getMediaxComments(mediaxId:string) {
    this.httpClient.get<Comment[]>(`api/comment/getmediaxcomments/${parseInt(mediaxId)}`).subscribe(data => {
      console.log("COMMENTS:" + JSON.stringify(data))
      this.mediaxComments = data
    });
  }

  createComment(comment:Comment) {
    return this.httpClient.post<Comment>('api/comment/createcomment', comment)
  }
}
