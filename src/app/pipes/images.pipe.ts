import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(value: string, tipo: 'usuario' | 'producto'): string {
    let url: string;

    if (!value) {
      return tipo === 'usuario' ?
        'assets/images/no-profile-image.png' : 'assets/images/no-image.png';
    }

    switch (tipo) {
      case 'usuario':
        url = `${environment.apiURL}/foto-usuario/${value}`;
        break;
      case 'producto':
        url = `${environment.apiURL}/foto-producto/${value}`;
        break;
    }

    return url;
  }

}
