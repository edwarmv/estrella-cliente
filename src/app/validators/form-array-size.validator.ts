import { FormArray, ValidatorFn } from '@angular/forms';

export function formArraySize(min: number = 1): ValidatorFn {
  return (formArray: FormArray) => {

    return formArray.length >= min ? null : { invalidSize: true };
  };
}
