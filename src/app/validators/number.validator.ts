import { AbstractControl } from '@angular/forms';

export function isntInteger(control: AbstractControl):
  { isntInteger: boolean } | null {
  return control.value ?
    (control.value as string).search(/\D/g) > -1 ?  { isntInteger: true } : null
    : null;
}

export function isntFloat(control: AbstractControl):
  { isntFloat: boolean } | null {
    if (!control.value) {
      return null;
    }
    const value  = (control.value as string).match(/^\d+((\.\d+)|(\,\d+))?$/);
    return value ? null : { isntFloat: true };
}
