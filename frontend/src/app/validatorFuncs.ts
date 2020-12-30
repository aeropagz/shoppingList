import { ValidatorFn, FormGroup } from "@angular/forms";



export function requireCheckboxes(): ValidatorFn {
    console.log("validate");
    
    return function validate (formGroup: FormGroup) {
      let checked = 0;
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control.value === true) {
          checked++;
        }
      });
      if (checked < 1) {
        return {
          requireCheckboxesToBeChecked: true,
        };
      }

      return null;
    };
  }