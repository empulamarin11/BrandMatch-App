// Servicio de dominio: arma la propuesta comercial (Pitch) para un creador.
// Es JavaScript puro: no importa React Native ni Expo, así que se puede
// reutilizar y probar sin abrir la app.

const CAMPOS_OBLIGATORIOS = ['name', 'username', 'arquetipo'];

// Invariante: no se genera un pitch si el influencer no tiene nombre,
// usuario y arquetipo. Lanza un Error con los campos que faltan.
const validarInfluencer = (influencer) => {
  if (!influencer) {
    throw new Error('Se necesita un influencer para generar el pitch.');
  }
  const faltantes = CAMPOS_OBLIGATORIOS.filter((campo) => !influencer[campo]);
  if (faltantes.length > 0) {
    throw new Error(`Faltan datos del influencer: ${faltantes.join(', ')}.`);
  }
};

// Devuelve el pitch como objeto inmutable: { destinatario, mensaje }.
export const generarPitch = (influencer) => {
  validarInfluencer(influencer);

  const mensaje = `Hola ${influencer.name},

He estado siguiendo tu contenido y me encanta tu estilo (${influencer.arquetipo}) y cómo conectas con tu comunidad. Creemos que tu perfil encaja perfectamente con nuestra nueva línea premium.

¿Te parece bien agendar una llamada esta semana?

El Equipo de Marketing.`;

  return Object.freeze({
    destinatario: `@${influencer.username}`,
    mensaje,
  });
};