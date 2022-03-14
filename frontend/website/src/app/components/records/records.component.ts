import { Component, OnInit } from '@angular/core';
import {MediaxService} from "../../services/mediax.service";
import {Mediax} from "../../interfaces/Mediax";
import * as $ from 'jquery';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  closeResult = '';
  safeUrl: SafeResourceUrl | undefined;
  currentmx:Mediax = {} as Mediax;;

  constructor(public mediaxServ:MediaxService, 
    public authServ: AuthService, 
    private router: Router,
    private modalService: NgbModal, private _sanitizer: DomSanitizer) { }


  listOfMediax:Mediax[] = [];

  ngOnInit(): void {

    if(this.authServ.getLoggedInUser() == null){
      this.router.navigateByUrl('/records');
    }


    this.mediaxServ.getUserMediax().subscribe((data:Mediax[]) => {
      this.listOfMediax = data;
    });
  }

  deleteMediax(mediaxDelete: Mediax){
    this.mediaxServ.deleteMediax(mediaxDelete);
    this.router.navigateByUrl('/home');
  }


  rename(mx: Mediax){
    let newname = prompt("New file name:");
    mx.filename = newname || mx.filename;
    this.editMediax(mx);
  }

  dowload(mxdto:Mediax){
    // let url = window.URL.createObjectURL(mxdto.url||"#");
    // let a = document.createElement('a');
    // document.body.appendChild(a);
    // a.setAttribute('style', 'display: none');
    // a.href = url;
    // a.download = mxdto.filename;
    // a.click();
    // window.URL.revokeObjectURL(url);
    // a.remove();
  }

  open(imagemodal:any,videomodal:any,mxdto:Mediax) {
    this.currentmx = mxdto;
    if (this.currentmx.isvideo) {
      console.log(mxdto.url)
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.currentmx.url as string)
      this.modalService.open(videomodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
      this.modalService.open(imagemodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
