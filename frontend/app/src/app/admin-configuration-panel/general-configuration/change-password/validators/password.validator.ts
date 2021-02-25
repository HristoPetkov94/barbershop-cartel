import {FormGroup} from '@angular/forms';

// https://www.pluralsight.com/guides/building-custom-validators-in-angular
// To validate password and confirm password
export function PasswordMatchValidator(
  firstPassword: string,
  secondPassword: string
) {
  return (formGroup: FormGroup) => {
    const firstPasswordField = formGroup.controls[firstPassword];
    const secondPasswordField = formGroup.controls[secondPassword];

    if (secondPasswordField.errors && !secondPasswordField.errors.match) {
      return;
    }

    if (firstPasswordField.value === secondPasswordField.value) {
      secondPasswordField.setErrors({match: true});
    } else {
      secondPasswordField.setErrors(null);
    }
  };
}

export function PasswordDoNotMatchValidator(
  firstPassword: string,
  secondPassword: string
) {
  return (formGroup: FormGroup) => {
    const firstPasswordField = formGroup.controls[firstPassword];
    const secondPasswordField = formGroup.controls[secondPassword];

    if (secondPasswordField.errors && !secondPasswordField.errors.noMatch) {
      return;
    }

    if (firstPasswordField.value !== secondPasswordField.value) {
      secondPasswordField.setErrors({noMatch: true});
    } else {
      secondPasswordField.setErrors(null);
    }
  };
}


