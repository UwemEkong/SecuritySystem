import { Component, OnInit } from '@angular/core';
import {MediaxService} from "../../services/mediax.service";
import {Mediax} from "../../interfaces/Mediax";
import * as $ from 'jquery';

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

  deleteMediax(mediaxDelete: Mediax){
    this.mediaxServ.deleteMediax(mediaxDelete);
    //location.reload();

  }

  rename(mx: Mediax){
    let newname = prompt("New file name:");
    mx.filename = newname || mx.filename;
    this.editMediax(mx);
  }

  editMediax(mx: Mediax) {
    this.mediaxServ.editMediax(mx);
  }

  showhide(mxdto: Mediax,i:number) {

    let elem = $("#img"+i);

    console.log($("#img"+i).is(":hidden"));

    //elem.css('visibility', 'visible'); //to show
    //elem.css('visibility', 'hidden');

    // $("#img" + i).show();
    //

    if(elem.css("visibility") == "hidden"){
      elem.css("visibility","visible");
    } else {
      elem.css("visibility","hidden");
    }

    // if(elem.is(":hidden")) {
    //   elem.css("display","block");
    // } else {
    //   elem.hide();
    // }

  }
}
