// Errores del dominio de autenticación. No dependen de React ni de la UI.

// Uno o varios datos no cumplen las reglas del negocio.
// `fieldErrors` asocia cada campo con su mensaje: { email: '...', password: '...' }.
export class ValidationError extends Error {
  constructor(fieldErrors) {
    super('Invalid data.');
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

// La operación existe en el dominio pero todavía no hay un servicio que la implemente.
export class NotConfiguredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotConfiguredError';
  }
}
