import { Component, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validators.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder,
    private valService: ValidatorsService,
    private emailValidator: EmailValidatorService
  )
  { }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, 
                Validators.pattern(this.valService.firstNameAndLastnamePattern)]],//! Validano nombre
    email: ['', [Validators.required, 
                Validators.pattern(this.valService.emailPattern),
                [ this.emailValidator ]]],
    username: ['', [Validators.required, 
                    Validators.minLength(3), 
                    this.valService.cantBeStrider], ], //! El usuario no puede ser Strider
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, 
  {
    validators: [ this.valService.isFieldOneEqualFieldTwo('password', 'password2')]
  });

  isValidField(field: string): boolean | null {
    return this.valService.isValidField(this.myForm, field);
  }

  onSubmit(): void {
    console.log('Antes de crear');
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }

  getFieldError(field: string): string | null {
    return this.valService.getFieldError(this.myForm, field);
  }

}

