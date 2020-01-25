import { AbstractControl, ValidatorFn } from '@angular/forms';

export function rangeValidator(getMin: (() => number), getMax: (() => number)): ValidatorFn {
  
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isOutsideRange = control.value < getMin() || control.value > getMax();

    return isOutsideRange ? { 'range': { value: control.value } } : null;
  };
}