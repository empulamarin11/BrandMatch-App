// Caso de uso "Crear cuenta": coordina la validación del dominio y el repositorio.
// Recibe el repositorio por parámetro, así no depende de ninguna implementación concreta.

import { FullName } from '../../domain/auth/FullName';
import { Email } from '../../domain/auth/Email';
import { NewPassword } from '../../domain/auth/NewPassword';
import { ValidationError } from '../../domain/auth/AuthErrors';

export function makeRegisterUser(authRepository) {
  return async function registerUser({ fullName, email, password, repeatPassword }) {
    const fieldErrors = {};

    const fullNameError = FullName.validate(fullName);
    if (fullNameError) fieldErrors.fullName = fullNameError;

    const emailError = Email.validate(email);
    if (emailError) fieldErrors.email = emailError;

    const passwordError = NewPassword.validate(password);
    if (passwordError) fieldErrors.password = passwordError;

    const repeatError = NewPassword.validateRepeat(password, repeatPassword);
    if (repeatError) fieldErrors.repeatPassword = repeatError;

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidationError(fieldErrors);
    }

    return authRepository.register(
      FullName.create(fullName),
      Email.create(email),
      NewPassword.create(password),
    );
  };
}
