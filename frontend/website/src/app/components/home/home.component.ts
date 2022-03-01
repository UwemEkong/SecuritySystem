import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {ImageService} from "../../services/image.service";

class image {
  constructor(
    public id: number,
    public url: string) {}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imageList: image[] = [];

  constructor(public authService: AuthService, public imageService: ImageService) { }

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
