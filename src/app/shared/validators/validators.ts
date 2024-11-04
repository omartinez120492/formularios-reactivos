import { FormControl, ValidationErrors } from "@angular/forms";


export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

//TODO: Validar que el email sea un email válido
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


//TODO: Validar que el usuario no sea Strider
export const cantBeStrider = (control: FormControl):ValidationErrors | null => {

  const value = control.value.trim().toLowerCase();

  if (value === 'strider') {
    return {
      strider: true
    }
  }
  return null;
}

