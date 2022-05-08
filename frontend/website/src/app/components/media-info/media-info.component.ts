import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mediax } from 'src/app/interfaces/Mediax';
import { LocationService } from 'src/app/services/location.service';
import { MediaxService } from 'src/app/services/mediax.service';

@Component({
  selector: 'app-media-info',
  templateUrl: './media-info.component.html',
  styleUrls: ['./media-info.component.scss']
})
export class MediaInfoComponent implements OnInit {

  constructor(private router:ActivatedRoute, public mediaxService: MediaxService, private locationService:LocationService) { }

  ngOnInit(): void {
    this.queryParamId = this.router.snapshot.paramMap.get('id')!;
    this.mediaxService.getAllSharedMediaxObservable().subscribe((data) => {
      this.mediaInfo = data.find((obj)=>{
        return obj.id == parseInt(this.queryParamId)
      })
      console.log(this.mediaInfo)
      this.mediaInfoStr = JSON.stringify(this.mediaInfo)
      this.locationService.loader.load().then(()=> {
      let map = new google.maps.Map(document.getElementById("map-small") as any,{
          center: {lat: this.getLatLng(this.mediaInfo!.location, 2), lng:this.getLatLng(this.mediaInfo!.location, 3)},
          zoom:12,
        })
        const myLatLng = { lat: this.getLatLng(this.mediaInfo!.location, 2), lng: this.getLatLng(this.mediaInfo!.location, 3) };
        new google.maps.Marker({
          position: myLatLng,
          icon:{url: this.icon_image_url, scaledSize: new google.maps.Size(50, 50),origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(0, 0)},
          map,
        });
      })
      this.chooseCategoryImage()
    })
    
  }

  queryParamId = ""
  mediaInfo: Mediax | undefined = <Mediax>{};
  mediaInfoStr: string = ""
  category_image = ""
  icon_image_url = ""

  safety_img = "https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-traffic-safety-warning-png-image_2284310.jpg"
  crime_img = "https://www.nydailynews.com/resizer/AWHLHT5L2Rlc1oX6kJxyuy9Jwl4=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/5VHD4667DFDDPKIFOXLYDDWZHI.jpg";
  animal_img = "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80"
  environmental_img = "https://nationaltoday.com/wp-content/uploads/2021/11/World-Pollution-Prevention-Day.jpg"
  community_img = "https://www.ef.com/wwen/blog/wp-content/uploads/2019/04/volunteers.jpg"

  chooseCategoryImage() {
    if (this.mediaInfo!.category == "Crime") {
      this.icon_image_url = "../../../assets/crime-icon.png"
      this.category_image = this.crime_img
    } else if (this.mediaInfo!.category == "Safety") {
      this.icon_image_url = "../../../assets/safety-icon.png"
      this.category_image = this.safety_img
    } else if (this.mediaInfo!.category == "Animal") {
      this.icon_image_url = "../../../assets/animal-icon.png"
      this.category_image = this.animal_img
    }else if (this.mediaInfo!.category == "Environmental") {
      this.icon_image_url = "../../../assets/environment-icon.png"
      this.category_image = this.environmental_img
    }else if (this.mediaInfo!.category == "Community") {
      this.icon_image_url = "../../../assets/community-icon.png"
      this.category_image = this.community_img
    }
  }
  
  getLatLng(location: string | undefined, idx:number) {
    let coordinate = parseFloat(location?.split(",")[idx]!)
    console.log(coordinate)
    return coordinate
  }
  downloadMedia() {
    this.mediaxService.editViews(this.mediaInfo!).subscribe((data)=>{
      this.mediaxService.getAllSharedMediaxObservable().subscribe((sharedData)=>{
        this.mediaInfo = sharedData.find((obj)=>{
          return obj.id == parseInt(this.queryParamId)
        })
      })
    })
  }
  
  hasViewed = false
  updateViews($event:any) {
    if (!this.hasViewed) {
      this.downloadMedia()
      this.hasViewed = !this.hasViewed
    }
  }
}
