import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'website';

  setDark = false;

  darkMode($event: boolean) {
    this.setDark = $event;
  }


}
