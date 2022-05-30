import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(controlName: string, matchingControlName: string):
  ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(controlName);
    const matchingPassword = control.get(matchingControlName);

    if (matchingPassword.errors && !matchingPassword.errors.passwordMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (password.value !== matchingPassword.value) {
      matchingPassword.setErrors({ passwordMatch: true });
    } else {
      matchingPassword.setErrors(null);
    }
  };
}
