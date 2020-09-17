import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(value: string, tipo?: 'usuario'): string {
    let url: string;

    if (!value) {
      return 'assets/images/no-profile-image.png';
    }

    switch (tipo) {
      case 'usuario':
        url = `${environment.apiURL}/foto-usuario/${value}`;
        break;
    }

    return url;
  }

}
