// Contrato del dominio: "debe existir una forma de autenticar".
// JavaScript no tiene interfaces, así que es una clase base cuyos métodos
// deben sobrescribirse en la capa de infraestructura (ver infrastructure/auth/AuthApi.js).

export class AuthRepository {
  /**
   * Inicia sesión con unas credenciales ya validadas.
   * @param {import('./Email').Email} email
   * @param {import('./Password').Password} password
   * @returns {Promise<unknown>} La sesión que devuelva el backend.
   */
  async login(email, password) {
    throw new Error('AuthRepository.login() is not implemented.');
  }

  /**
   * Solicita el envío de un enlace de recuperación de contraseña.
   * @param {import('./Email').Email} email
   * @returns {Promise<void>}
   */
  async requestPasswordReset(email) {
    throw new Error('AuthRepository.requestPasswordReset() is not implemented.');
  }
}
