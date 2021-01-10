import { ValidatorFn, FormGroup } from '@angular/forms';

export function mustMatch(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return function validate(formGroup: FormGroup) {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    }
    return null;
  };
}
