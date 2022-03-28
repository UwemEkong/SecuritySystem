import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../services/image.service";
import {AuthService} from "../../services/auth.service";
import {PreferencesService} from "../../services/preferences.service";

class image {
  constructor(
    public id: number,
    public url: string) {}
}

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  imageList: image[] = [];

  imageWidth = this.pref.imageSizeSetting;
  imageHeight = this.pref.imageSizeSetting*1.25;

  constructor(public imageService: ImageService, private authService: AuthService, private pref:PreferencesService) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    this.imageService.getAllImages().subscribe(response => {
      let i = 0;
      while (i in response){
        let newImage = <image>({
          id: response[i].id,
          url: response[i].url
        })
        this.imageList.push(newImage);
        i++
      }
      console.log(this.imageList)
    });
  }



}
