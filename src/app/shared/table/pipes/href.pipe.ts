import { Pipe, PipeTransform } from '@angular/core';
import { Row } from '../row.interface';

@Pipe({
  name: 'href'
})
export class HrefPipe implements PipeTransform {

  transform<T>(object: Row<T>, href: string[]): string[] {
    const res = [...href];
    href.forEach((value, i) => {
      if (value.includes('key')) {
        const key = value.split('.')[1];
        res[i] = object.values[key];
      }
    });
    return res;
  }

}
