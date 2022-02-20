import { Component, OnInit } from '@angular/core';
import {MediaxService} from "../../services/mediax.service";
import {Mediax} from "../../interfaces/Mediax";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  constructor(public mediaxServ:MediaxService) { }

  listOfMediax:Mediax[] = [];

  ngOnInit(): void {
    this.mediaxServ.getAllMediax().subscribe((data) => {
      console.log(data)
      this.listOfMediax = data;
      console.log(this.listOfMediax);
    });
  }



}
