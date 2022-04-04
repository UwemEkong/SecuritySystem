import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MapMarkerRef } from '../interfaces/MapMarkerRef';
import { Mediax } from '../interfaces/Mediax';
import { UserLocation } from '../interfaces/UserLocation';
import { MediaxService } from './mediax.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  lat = 0
  lng = 0
  currentLocation = <UserLocation>{};
  formattedLocation = ""
  search_radius_circle:any
  search_radius = 10
  main_map:any
  mini_map:any
  mapMarkers: MapMarkerRef[] = [];

  loader = new Loader({
    apiKey: 'AIzaSyDC4WKASsj0vvzMG88X0utfTPesCSc3dJs'
  })
  constructor(public httpClient:HttpClient, public mediaxService:MediaxService) { }

  getLatAndLng(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
        console.log(resp)
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

  getCityAndState( lat: number, lng: number ) {
    console.log('Finding Address');
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };
      geocoder.geocode(request as any, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results![0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            // this.address = rsltAdrComponent[resultLength - 8].short_name;
            this.currentLocation = this.getCurrentLocation(rsltAdrComponent);
            this.setCurrentCoordniates(this.currentLocation)
            this.formattedLocation = this.formatLocation();
            console.log(this.currentLocation)
            console.log(this.formattedLocation)
          } else {
            alert('No address available!');
          }
        }
      });
  }
  }

  getCurrentLocation(resultList:any) {
    let cityName = ""
    let stateName = ""
    for (let i = 0; i < resultList.length; i++) {
      for (let j = 0; j < resultList[i].types.length; j++) {
        if (resultList[i].types.includes('locality') && resultList[i].types.includes('political')) {
          cityName = resultList[i].long_name
        }

        if (resultList[i].types.includes('administrative_area_level_1') && resultList[i].types.includes('political')) {
         stateName = resultList[i].short_name
        }
      }
  }
  return {city:cityName, state:stateName, lat:this.lat, lng:this.lng}
  }

  getCityName(resultList:any) {
    for (let i = 0; i < resultList.length; i++) {
        for (let j = 0; j < resultList[i].types; j++) {
          if (resultList[i].types[j].includes('locality') && resultList[i].types[j].includes('political')) {
            return resultList[i].long_name
          }
        }
    }
  }

  formatLocation() {
    return this.currentLocation.city + "," + this.currentLocation.state + "," + this.currentLocation.lat + "," + this.currentLocation.lng
  }

  toggleSearchRadius(newRadius:number) {
    this.search_radius = newRadius
    this.search_radius_circle.setMap(null)
    this.search_radius_circle = new google.maps.Circle({
      strokeColor: "#44a6c6",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#44a6c6",
      fillOpacity: 0.35,
      map:this.main_map,
      center: {lat: 41.7784, lng:-88.0953},
      radius: this.search_radius * 1609.34,
    });
    this.filterSharedMediax()
  }

  drawSearchRadiusCircle(map:any) {
    this.search_radius_circle = new google.maps.Circle({
      strokeColor: "#44a6c6",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#44a6c6",
      fillOpacity: 0.35,
      map,
      center: {lat: 41.7784, lng:-88.0953},
      radius: this.search_radius * 1609.34,
    });
  }

  getCurrentCoordinates() {
    return this.httpClient.get<UserLocation>('api/location/getlocation')
  }

  setCurrentCoordniates(location: UserLocation) {
    this.httpClient.post<UserLocation>('api/location/setlocation', location).subscribe(() => {
      this.currentLocation = location;
    })
  }

  initializeUserPosition() {
    this.getCurrentCoordinates().subscribe((data)=>{
      if (!data) {
        this.loader.load().then(()=>{
          this.getLatAndLng().then(pos=>
            {
               console.log(`Positon:${pos.lat} ${pos.lng}`);
               this.getCityAndState(pos.lat, pos.lng)
            });
        })
      } else {
        this.currentLocation = data
        this.formattedLocation = this.formatLocation();
        console.log("current location", this.currentLocation)
      }
    })
  }

  filterSharedMediax() {
    if (this.search_radius == 0) {
      this.mediaxService.getAllSharedMediaxObservable().subscribe((data)=>{
        this.mediaxService.allSharedMediax = data
        this.updateMapMarkers(data)
      })
    } else {
      this.mediaxService.getAllSharedMediaxFilteredObservable(this.search_radius).subscribe((data)=>{
        this.mediaxService.allSharedMediax = data
        console.log("media",this.mediaxService.allSharedMediax, "markers", this.mapMarkers )
        this.updateMapMarkers(data)
      })
    }
  }

  updateMapMarkers(sharedMedia:Mediax[]) {
    this.clearMapMarkers()
    for (let i = 0; i < this.mapMarkers.length; i++) {
      if (this.markerIsValid(this.mapMarkers[i], sharedMedia)) {
        console.log("VALID")
        this.mapMarkers[i].marker.setMap(this.main_map)
      }
    }
  }

  clearMapMarkers() {
    for (let i = 0; i < this.mapMarkers.length; i++) {
      this.mapMarkers[i].marker.setMap(null)
    }
  }

  markerIsValid(mapMarkerRef:MapMarkerRef, sharedMedia:Mediax[]):boolean {
    for (let i = 0; i < sharedMedia.length; i++) {
      if (mapMarkerRef.lat == this.getLatLng(sharedMedia[i].location, 2) && mapMarkerRef.lng == this.getLatLng(sharedMedia[i].location, 3)) {
          return true
      }
    }
    return false
  }

  getLatLng(location: string | undefined, idx:number):number | undefined {
    let coordinate = parseFloat(location?.split(",")[idx]!)
    return coordinate
  }
}
