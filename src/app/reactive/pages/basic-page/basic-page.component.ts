import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Product {
  name: string;
  price: number;
  inStock: number;
}

const rtx: Product = {
  name: 'RTX 5090',
  price: 2100,
  inStock: 10,
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  //TODO: Inyectando el FormBuilder
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(rtx); //TODO: También se puede inicializar con un objeto el formulario
  }

  //TODO: Creando un formulario reactivo, NO tan elegante
  /*public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    inStock: new FormControl(0),
  });*/

  //TODO: Formulario con FormBuilder, es más elegante y fácil de usar
  public myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]], //TODO: Campo requerido, mínimo 3 caracteres, validadores de Angular
    price: [0, [Validators.required, Validators.min(0)]],
    inStock: [0, [Validators.required, Validators.min(0)]],
  })

  onSave() {
    //TODO: Validando el formulario
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); //TODO: Marcar todos los campos como tocados
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStock: 0 }); //TODO: Resetear el formulario
  }


  //TODO!: Método para validar un campo, si es inválido y está tocado
  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  //TODO!: Método para obtener el error de un campo
  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
      }
    }
    return null;
  }


}
