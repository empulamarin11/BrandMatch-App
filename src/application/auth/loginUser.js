// Caso de uso "Iniciar sesión": coordina la validación del dominio y el repositorio.
// Recibe el repositorio por parámetro, así no depende de ninguna implementación concreta.

import { Email } from '../../domain/auth/Email';
import { Password } from '../../domain/auth/Password';
import { ValidationError } from '../../domain/auth/AuthErrors';

export function makeLoginUser(authRepository) {
  return async function loginUser({ email, password }) {
    const fieldErrors = {};

    const emailError = Email.validate(email);
    if (emailError) fieldErrors.email = emailError;

    const passwordError = Password.validate(password);
    if (passwordError) fieldErrors.password = passwordError;

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidationError(fieldErrors);
    }

    return authRepository.login(Email.create(email), Password.create(password));
  };
}
