// Objeto de valor: un correo electrónico válido.
// La regla del correo vive aquí y en ningún otro lado.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email {
  constructor(value) {
    this.value = value;
    Object.freeze(this);
  }

  // Devuelve el mensaje de error, o null si el valor es válido.
  static validate(rawValue) {
    const value = (rawValue ?? '').trim();
    if (!value) return 'Email is required.';
    if (!EMAIL_REGEX.test(value)) return 'Enter a valid email address.';
    return null;
  }

  // Crea el objeto de valor normalizado. Lanza un Error si no es válido.
  static create(rawValue) {
    const error = Email.validate(rawValue);
    if (error) throw new Error(error);
    return new Email(rawValue.trim());
  }

  toString() {
    return this.value;
  }
}
