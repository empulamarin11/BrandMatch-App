import { calcularCompatibilidad } from '../../domain/match/MatchCalculator';

export const ejecutarCalculoMatch = (marca, influencer) => {
  return calcularCompatibilidad(marca, influencer);
};