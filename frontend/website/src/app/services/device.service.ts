import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '../interfaces/Device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(public httpClient: HttpClient) {}

  currentDevice = <Device>{};
  allUserDevices = new Array<Device>();

  getJetsonIP() {
    this.httpClient.get(`api/device/getJetsonIP/${this.currentDevice.macaddress}`, {responseType:'text'}).subscribe(data => {
      console.log("DEVICE IP:" + JSON.stringify(data))
      this.currentDevice.ip = data
    });
  }

  getJetsonIPObservable() {
    return this.httpClient.get(`api/device/getJetsonIP/${this.currentDevice.macaddress}`, {responseType:'text'});
  }

  getJetsonIPObservablePerDevice(mac:String | undefined) {
    return this.httpClient.get(`api/device/getJetsonIP/${mac}`, {responseType:'text'});
  }

  getAllUserDevices() {
    this.httpClient.get<Device[]>(`api/device/getAllUserDevices`).subscribe(data => {
      console.log("User Devices:" + JSON.stringify(data))
      this.allUserDevices = data
    });
  }

  getAllUserDevicesObservable() {
    return this.httpClient.get<Device[]>(`api/device/getAllUserDevices`);
  }

  createDevice(device:Device) {
    return this.httpClient.post<Device>('api/device/createDevice', device)
  }

  editDevice(device:Device) {
    return this.httpClient.put<Device>('api/device/editDevice', device)
  }
}
