// Fuente de datos de influencers. Hoy lee la base de datos simulada
// (src/data/mockDatabase.js); cuando exista el backend, solo cambia este archivo.
import { MOCK_INFLUENCERS } from '../../data/mockDatabase';

export const getInfluencers = () => {
  return MOCK_INFLUENCERS;
};
