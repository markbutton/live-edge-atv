import { AbstractControl, ValidatorFn } from '@angular/forms';

export function InvalidZoneValidator(list: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const exists = list.find(element => element === control.value);
    if (!exists) {
      return { 'zoneID': true };
    }
    return null;
  };
}
