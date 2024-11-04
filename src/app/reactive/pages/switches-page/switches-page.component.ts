import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {
  constructor(private fb: FormBuilder) {}

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    notifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'M',
    notifications: false,
    termsAndConditions: false,
  };

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  onSave() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    console.log(newPerson);
    this.resetForm();
  }

  resetForm() {
    this.myForm.reset();
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  // TODO: Verificando las condiciones establecidas en myForm
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'requiredTrue':
          return 'Debes aceptar las condiciones de uso';
      }
    }
    return null;
  }
}
