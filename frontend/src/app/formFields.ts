import { Validators } from '@angular/forms';

export const FormFields = {
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
  mobile: [
    '',
    [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
  ],
  description: ['', Validators.minLength(5)],
};
