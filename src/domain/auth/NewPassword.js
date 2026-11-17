// Objeto de valor: la contraseña de una cuenta nueva.
// Es más estricta que Password (que solo se usa para iniciar sesión):
// al crear la cuenta se exige un largo mínimo y que se repita igual.

const MIN_LENGTH = 6;

export class NewPassword {
  constructor(value) {
    this.value = value;
    Object.freeze(this);
  }

  // Devuelve el mensaje de error, o null si el valor es válido.
  static validate(rawValue) {
    if (!rawValue) return 'Password is required.';
    if (rawValue.length < MIN_LENGTH) return `Password must be at least ${MIN_LENGTH} characters.`;
    return null;
  }

  // Revisa que la contraseña repetida sea igual. Devuelve el mensaje de error, o null.
  static validateRepeat(rawValue, repeatValue) {
    if (!repeatValue) return 'Please repeat your password.';
    if (rawValue !== repeatValue) return 'Passwords do not match.';
    return null;
  }

  // Crea el objeto de valor. Lanza un Error si no es válido.
  static create(rawValue) {
    const error = NewPassword.validate(rawValue);
    if (error) throw new Error(error);
    return new NewPassword(rawValue);
  }
}
