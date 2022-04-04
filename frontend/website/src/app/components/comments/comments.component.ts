import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(public commentService:CommentService, private authService: AuthService) { }

  ngOnInit(): void {
    this.commentService.getMediaxComments(this.mediaxId)
  }

  @Input()
  mediaxId = ""

  createComment(commentData: any) {
    this.commentService.createComment({content:commentData.value.content, username: this.authService.loggedInUser.username, mediaid:parseInt(this.mediaxId)}).subscribe(commentData => {
      this.commentService.getMediaxComments(this.mediaxId)
    })
    this.postPlaceholder = "Write a comment..."
  }

  postPlaceholder = "Write a comment..."
  clearPlaceHolder() {
    this.postPlaceholder = "";
  }
}
