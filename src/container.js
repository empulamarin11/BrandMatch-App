// Raíz de composición: el único sitio que conoce todas las capas.
// Aquí se elige qué implementación de infraestructura usa cada caso de uso.
// Para cambiar de backend (o usar un mock en tests) solo se toca este archivo.

import { AuthApi } from './infrastructure/auth/AuthApi';
import { makeLoginUser } from './application/auth/loginUser';
import { makeRequestPasswordReset } from './application/auth/requestPasswordReset';

const authRepository = new AuthApi();

export const loginUser = makeLoginUser(authRepository);
export const requestPasswordReset = makeRequestPasswordReset(authRepository);
