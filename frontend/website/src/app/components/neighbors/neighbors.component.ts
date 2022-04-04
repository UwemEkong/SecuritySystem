import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Mediax } from 'src/app/interfaces/Mediax';
import { LocationService } from 'src/app/services/location.service';
import { MediaxService } from 'src/app/services/mediax.service';

@Component({
  selector: 'app-neighbors',
  templateUrl: './neighbors.component.html',
  styleUrls: ['./neighbors.component.scss']
})
export class NeighborsComponent implements OnInit {

  constructor(public locationService: LocationService, public mediaxService:MediaxService) { }

  title = "google-maps"
  ngOnInit(): void {
    this.mediaxService.getAllSharedMediaxObservable().subscribe((data)=>{
      this.locationService.loader.load().then(()=>{
      this.locationService.main_map =  new google.maps.Map(document.getElementById("map") as any,{
          center: {lat: this.locationService.currentLocation.lat, lng:this.locationService.currentLocation.lng},
          zoom:10
        })
        this.getMapMarkers(data, this.locationService.main_map)
        this.locationService.filterSharedMediax()
        this.locationService.drawSearchRadiusCircle(this.locationService.main_map)
      })
    })
    this.mediaxService.getAllSharedMediax()
  }
 
  getMapMarkers(sharedMedia:Mediax[], map:any) {
    for (let i = 0; i < sharedMedia.length; i++) {
      const myLatLng = { lat: this.getLatLng(sharedMedia[i]!.location, 2), lng: this.getLatLng(sharedMedia[i]!.location, 3) };
      const iconImage = this.getIconImage(sharedMedia[i])
      const marker = new google.maps.Marker({
        position: myLatLng,
        icon:{url: iconImage!, scaledSize: new google.maps.Size(50, 50),origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)},
        map:null
      });
      this.locationService.mapMarkers.push({marker:marker, lat:myLatLng.lat, lng:myLatLng.lng})
    }
  }

  getLatLng(location: string | undefined, idx:number) {
    let coordinate = parseFloat(location?.split(",")[idx]!)
    console.log(coordinate)
    return coordinate
  }

  getIconImage(mediax:Mediax) {
    if (mediax!.category == "Crime") {
      return "../../../assets/crime-icon.png"
    } else if (mediax!.category == "Safety") {
      return "../../../assets/safety-icon.png"
    } else if (mediax!.category == "Animal") {
      return "../../../assets/animal-icon.png"
    }else if (mediax!.category == "Environmental") {
      return "../../../assets/environment-icon.png"
    }else {
      return "../../../assets/community-icon.png"
    }
  }

}
