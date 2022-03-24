import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../services/feedback.service";
import {PreferencesService} from "../../services/preferences.service";

class feedback {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public question: string,
    public sent: boolean
  ) {
  }
}
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  feedbackList: feedback[] = [];
  fontSize = this.pref.fontSizeSetting;
  headerSize = this.pref.fontSizeSetting*1.5;

  constructor(public feedbackService: FeedbackService, private pref: PreferencesService) { }

  ngOnInit(): void {
    document.body.style.fontSize = this.fontSize + 'px';

  }

  create(feedbackData: any) {
    this.feedbackService.create({
      name: feedbackData.value.name,
      email: feedbackData.value.email,
      question: feedbackData.value.question,
      sent: false});
  }

  getAllFeedback() {
    this.feedbackService.getAllFeedback().subscribe(response => {
      let i = 0;
      while (i in response){
        let newfeedback = <feedback>({
          id: response[i].id,
          name: response[i].name,
          email: response[i].email,
          question: response[i].question,
          sent: response[i].sent
        })
        this.feedbackList.push(newfeedback);
        i++
      }
      console.log(this.feedbackList)
    });
  }




}
