// Objeto de valor: una contraseña aceptable para iniciar sesión.

export class Password {
  constructor(value) {
    this.value = value;
    Object.freeze(this);
  }

  // Devuelve el mensaje de error, o null si el valor es válido.
  static validate(rawValue) {
    if (!rawValue) return 'Password is required.';
    return null;
  }

  // Crea el objeto de valor. Lanza un Error si no es válido.
  static create(rawValue) {
    const error = Password.validate(rawValue);
    if (error) throw new Error(error);
    return new Password(rawValue);
  }
}
