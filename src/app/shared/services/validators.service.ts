import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  public cantBeStrider = (control: FormControl):ValidationErrors | null => {
    const value = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        strider: true
      }
    }
    return null;
  }

  public isValidField( form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors
      && form.controls[field].touched;
  }

  isFieldOneEqualFieldTwo(field1: string, field2: string): ValidationErrors | null   {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const field1Control = formGroup.get(field1);
      const field2Control = formGroup.get(field2);
      if (field1Control?.value !== field2Control?.value) {
        formGroup.controls[field2].setErrors({ notEqual: true });
        return { notEqual: true };
      }
      formGroup.controls[field2].setErrors(null);
      return null;
    };
  }

  getFieldError( myForm: FormGroup, field: string): string | null {
    if ( !myForm.controls[field] ) return null;
    const errors = myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'pattern':
          return 'Debe ser nombre y apellido';
        case 'required':
          return 'Este campo es requerido';
        case 'strider':
          return 'El username no puede ser Strider';
        case 'emailTaken':
          return 'El email ya está registrado';
        case 'notEqual':
          return 'Las contraseñas deben ser iguales';
        case 'requiredTrue':
          return 'Debes aceptar las condiciones de uso';
      }
    }
    return null;
  }
}
