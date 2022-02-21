import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../services/image.service";

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

  constructor(public imageService: ImageService) { }

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
