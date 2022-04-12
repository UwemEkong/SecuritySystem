import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public preferencesService: PreferencesService, public authService: AuthService, public router:Router, public deviceService:DeviceService) { }

  ngOnInit(): void {
    this.deviceService.getJetsonIPObservablePerDevice(this.macaddress).subscribe((data) =>{
      if (data != "") {
        this.active = true
      }
    })
  }

  @Input() deviceID: number | undefined
  @Input() macaddress: string | undefined
  @Input() name: string | undefined
  @Input() location: string | undefined
  @Input() active: boolean | undefined

  deletePeriod = this.preferencesService.currentUserPrefences.remove;

  toggleMotion(newSetting: boolean) {

    let preferences:Preferences = {userid: this.authService.loggedInUser.id, remove: this.deletePeriod, motion: newSetting, dark: false}
    this.preferencesService.editPreferences(preferences);

  this.preferencesService.getPreferences2(this.authService.loggedInUser.id as number)
  this.preferencesService.updateFlaskPreferences(preferences)
}

navigateToRecordsPage() {
  this.router.navigateByUrl("/records")
}

navigateToCamera() {
  this.router.navigateByUrl((`/camera/${this.macaddress}`))
}

}
