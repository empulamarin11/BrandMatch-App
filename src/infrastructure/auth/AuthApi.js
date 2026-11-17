// Implementación del contrato AuthRepository: conexión con el exterior.
// PENDIENTE: el proyecto todavía no tiene backend.

import { AuthRepository } from '../../domain/auth/AuthRepository';
import { NotConfiguredError } from '../../domain/auth/AuthErrors';

export class AuthApi extends AuthRepository {
  async login(email, password) {
    // TODO: sustituir por la llamada real cuando exista el backend, p. ej.:
    //   const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', ... });
    //   if (!res.ok) throw new Error('Invalid email or password.');
    //   return res.json();
    //
    // Mientras tanto no se verifica ninguna credencial ni se devuelve una sesión
    // inventada: solo se mantiene el flujo de navegación del prototipo.
    return null;
  }

  async requestPasswordReset(email) {
    // TODO: sustituir por la llamada real cuando exista el backend.
    throw new NotConfiguredError('Password recovery is not configured yet.');
  }

  async register(fullName, email, password) {
    // TODO: sustituir por la llamada real cuando exista el backend, p. ej.:
    //   const res = await fetch(`${API_URL}/auth/register`, { method: 'POST', ... });
    //   if (!res.ok) throw new Error('Unable to create the account.');
    //   return res.json();
    //
    // Mientras tanto no se guarda ninguna cuenta: solo se mantiene el flujo
    // de navegación del prototipo.
    return null;
  }
}
