// Objeto de valor: el nombre completo de un usuario nuevo.
// La regla del nombre vive aquí y en ningún otro lado.

const MIN_LENGTH = 3;

export class FullName {
  constructor(value) {
    this.value = value;
    Object.freeze(this);
  }

  // Devuelve el mensaje de error, o null si el valor es válido.
  static validate(rawValue) {
    const value = (rawValue ?? '').trim();
    if (!value) return 'Full name is required.';
    if (value.length < MIN_LENGTH) return `Full name must be at least ${MIN_LENGTH} characters.`;
    return null;
  }

  // Crea el objeto de valor normalizado. Lanza un Error si no es válido.
  static create(rawValue) {
    const error = FullName.validate(rawValue);
    if (error) throw new Error(error);
    return new FullName(rawValue.trim());
  }

  toString() {
    return this.value;
  }
}
