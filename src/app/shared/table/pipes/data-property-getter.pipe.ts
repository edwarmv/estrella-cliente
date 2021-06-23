import { Pipe, PipeTransform } from '@angular/core';
import { Row } from '../row.interface';

@Pipe({
  name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

  transform<T>(object: Row<T>, keys: Array<keyof T>): string {
    let value = '';
    keys.forEach((key, i) => {
      if (i > 0) {
        value += ' ';
      }
      value += object.values[key];
    });
    return value;
  }

}
