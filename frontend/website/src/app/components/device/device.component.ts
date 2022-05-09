import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Preferences } from 'src/app/interfaces/Preferences';
import { AuthService } from 'src/app/services/auth.service';
import { DeviceService } from 'src/app/services/device.service';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  constructor(public preferencesService: PreferencesService, public authService: AuthService, public router: Router, public deviceService: DeviceService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.deviceService.getJetsonIPObservablePerDevice(this.deviceID as Number).subscribe((data) => {
      if (data != "") {
        this.active = true
        this.deviceIp = data
        console.log(this.deviceIp)
      } else {
        this.active = false
      }
    })
  }

  @Input() deviceID: number | undefined
  @Input() macaddress: string | undefined
  @Input() name: string | undefined
  @Input() location: string | undefined
  @Input() active: boolean | undefined
  @Input() defaultdevice: boolean | undefined
  @Input() motionactive: boolean | undefined
  deviceIp = ""
  deletePeriod = this.preferencesService.currentUserPrefences.remove;

  navigateToRecordsPage() {
    this.router.navigateByUrl(`/records/${this.deviceID}`)
  }

  navigateToCamera() {
    this.router.navigateByUrl((`/camera/${this.deviceID}`))
  }
  closeResult = '';

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openSettingsModal(settingsModal: any) {
    this.modalService.open(settingsModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeletionModal(deletionModal: any) {
    this.modalService.open(deletionModal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateDevice(deviceData: any, modal:any) {
    console.log(this.deviceID)
    this.deviceService.editDevice({
      id: this.deviceID,
      userid: this.authService.loggedInUser.id,
      macaddress: deviceData.value.macaddress,
      name: deviceData.value.name,
      location: deviceData.value.location,
      active: this.active,
      defaultdevice: this.defaultdevice,
      motionactive: this.motionactive
    }).subscribe((data) => {
      this.deviceService.getAllUserDevices()
      this.deviceService.initializeDefaultDevice()
      this.deviceService.setJetsonMotionCapture(this.deviceIp, this.deviceID?.toString() as string)
      modal.close('Save click')
    })
  }

  deleteDevice(deletionModal: any) {
    this.deviceService.deleteDevice(this.deviceID as number).subscribe((data) => {
      this.deviceService.getAllUserDevices()
      deletionModal.dismiss('Cross click')
    })
  }

  updateDefaultDevice() {
    this.defaultdevice = !this.defaultdevice
  }

  updateMotionCapture() {
    this.motionactive = !this.motionactive
  }

}
