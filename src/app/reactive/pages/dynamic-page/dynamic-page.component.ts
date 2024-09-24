import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  constructor(private formBuilder: FormBuilder) { }

  public miFormulario: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    //TODO: Array de opciones de juegos para un desplegable (select)
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  })

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  //TODO: Así se obtiene el array de juegos favoritos
  get getfavoriteGames() {
    //TODO: Se debe tratar como un array, no como un objeto
    return this.miFormulario.get('favoriteGames') as FormArray;
  }

  onDeleteFavorite(index: number): void {
    this.getfavoriteGames.removeAt(index);
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;
    this.getfavoriteGames.push(new FormControl(newGame, Validators.required));
    this.newFavorite.reset();
  }


  onSubmit(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    //TODO: Listo para enviar a backend
    console.log(this.miFormulario.value);
    // Reiniciar favoriteGames
    (this.miFormulario.get('favoriteGames') as FormArray).clear();
    // Agregar un juego favorito inicial
    this.miFormulario.reset()
  }

  //TODO: Método para verificar si un campo es válido
  isValidField(field: string): boolean | null {
    return this.miFormulario.controls[field].errors && this.miFormulario.controls[field].touched;
  }


  //TODO: Método para obtener el error de un campo
  getFieldError(field: string): string | null {

    if (!this.miFormulario.controls[field]) return null;
    const errors = this.miFormulario.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        default:
          return null;
      }
    }
    return null;
  }
  //TODO: Método para verificar si un campo es válido en un array, como de los favoritos
  isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched;
  }

  getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (!formArray.controls[index]) return null;
    const errors = formArray.controls[index].errors || {};
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
