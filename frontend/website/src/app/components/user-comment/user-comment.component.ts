import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/Comment';
@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss']
})
export class UserCommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  id: number | undefined
  @Input()
  mediaid: number | undefined
  @Input()
  content: string | undefined
  @Input()
  username: string | undefined
  @Input()
  date: string | undefined
}
