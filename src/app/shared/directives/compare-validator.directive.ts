import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[compareValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CompareValidatorDirective,
      multi: true,
    },
  ],
})
export class CompareValidatorDirective implements Validator {
  @Input('compareValidator') controlNameToCompare: string;
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const controlToCompare = control.root.get(this.controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription =
        controlToCompare.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
          subscription.unsubscribe();
        });
    }
    return controlToCompare && controlToCompare.value != control.value
      ? { compareValidator: true }
      : null;
  }
}
