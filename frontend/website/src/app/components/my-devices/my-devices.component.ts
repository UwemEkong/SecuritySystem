import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceService } from 'src/app/services/device.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-my-devices',
  templateUrl: './my-devices.component.html',
  styleUrls: ['./my-devices.component.scss']
})
export class MyDevicesComponent implements OnInit {

  constructor(public deviceService: DeviceService, public modalService: NgbModal, public authService: AuthService, public locationService:LocationService) { }

  ngOnInit(): void {
    this.deviceService.getAllUserDevices()
  }
  
  macAddPlaceholder = "Enter Mac Address"
  namePlaceholder = "Enter device name"

  clearMacAddPlaceholder() {
    this.macAddPlaceholder = ""
  }

  clearNamePlaceholder() {
    this.namePlaceholder = ""
  }
  createDevice(deviceData:any) {
    this.deviceService.createDevice({userid:this.authService.loggedInUser.id, macaddress: deviceData.value.macaddress, name: deviceData.value.name, location: this.locationService.formattedLocation, active:false, defaultdevice:false}).subscribe((data)=>{
      this.deviceService.getAllUserDevices()
    })
  }

  closeResult = ''
  open(createdevicemodal:any) {
      this.modalService.open(createdevicemodal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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

}
