// Caso de uso "Recuperar contraseña".

import { Email } from '../../domain/auth/Email';
import { ValidationError } from '../../domain/auth/AuthErrors';

export function makeRequestPasswordReset(authRepository) {
  return async function requestPasswordReset({ email }) {
    const emailError = Email.validate(email);
    if (emailError) {
      throw new ValidationError({ email: emailError });
    }

    return authRepository.requestPasswordReset(Email.create(email));
  };
}
