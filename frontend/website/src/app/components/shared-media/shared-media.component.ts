import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { Mediax } from 'src/app/interfaces/Mediax';
import { MediaxService } from 'src/app/services/mediax.service';
@Component({
  selector: 'app-shared-media',
  templateUrl: './shared-media.component.html',
  styleUrls: ['./shared-media.component.scss']
})
export class SharedMediaComponent implements OnInit {

  constructor(private router: Router, private mediaService:MediaxService) { }

  ngOnInit(): void {
    this.chooseCategoryImage();
    console.log(this.media!.url)
  }

  chooseCategoryImage() {
    if (this.media!.category == "Crime") {
      this.category_image = this.crime_img
    } else if (this.media!.category == "Safety") {
      this.category_image = this.safety_img
    } else if (this.media!.category == "Animal") {
      this.category_image = this.animal_img
    }else if (this.media!.category == "Environmental") {
      this.category_image = this.environmental_img
    }else if (this.media!.category == "Community") {
      this.category_image = this.community_img
    }
  }

  openMediaInfo() {
    this.mediaService.currentMediaInfo = this.media!
    this.router.navigateByUrl((`/media-info/${this.media!.id}`))
  }

  @Input() media: Mediax | undefined

  category_image = ""

  safety_img = "https://png.pngtree.com/element_our/20200702/ourlarge/pngtree-traffic-safety-warning-png-image_2284310.jpg"
  crime_img = "https://www.nydailynews.com/resizer/AWHLHT5L2Rlc1oX6kJxyuy9Jwl4=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/5VHD4667DFDDPKIFOXLYDDWZHI.jpg";
  animal_img = "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHVwcHklMjBkb2d8ZW58MHx8MHx8&w=1000&q=80"
  environmental_img = "https://nationaltoday.com/wp-content/uploads/2021/11/World-Pollution-Prevention-Day.jpg"
  community_img = "https://www.ef.com/wwen/blog/wp-content/uploads/2019/04/volunteers.jpg"
}
