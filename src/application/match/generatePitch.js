import { generarPitch } from '../../domain/match/PitchGenerator';

// Caso de uso: la pantalla pide el pitch y el dominio lo construye.
export const ejecutarGeneracionPitch = (influencer) => {
  return generarPitch(influencer);
};