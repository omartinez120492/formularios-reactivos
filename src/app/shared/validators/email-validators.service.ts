import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {

  /*validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    console.log({ email });
    return of({ emailTaken: true }).pipe(
      delay(2000)
    );
  }*/

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const httpCallObservable: Observable<ValidationErrors | null> = new Observable((subscriber) => {
      console.log({ email });
      if (email === 'omar@gmail.com') {
        subscriber.next({ emailTaken: true, message: 'El email ya está registrado' }); // El email ya existe
        subscriber.complete();
        return;
      }
      subscriber.next(null); //! El email es correcto porque no existe
      subscriber.complete();
    });
    return httpCallObservable.pipe(
      delay(3500) //! Simulando una llamada a un servicio, con un retardo de 3.5 segundos
    );
  }

}
