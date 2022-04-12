import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(locationStr: string | undefined) {
    let strArr = locationStr!.split(",")
    return strArr[0] + ", " + strArr[1]
  }

}
