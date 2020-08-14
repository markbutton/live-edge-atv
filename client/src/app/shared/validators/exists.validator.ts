import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateExists(list: any, create: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const exists = list.find(element => element === control.value);
      if (exists && create) {
          return { 'hdName': true  };
      }
      return null;
  };
}
