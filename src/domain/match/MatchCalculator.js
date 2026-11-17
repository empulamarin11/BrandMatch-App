export const calcularCompatibilidad = (marca, influencer) => {
  const promedioMarca = (marca.creatividad + marca.seriedad + marca.sociabilidad + marca.empatia + marca.estabilidad) / 5;
  const promedioInfluencer = (influencer.bigfive.a + influencer.bigfive.r + influencer.bigfive.e + influencer.bigfive.am + influencer.bigfive.n) / 5;
  
  let matchPct = 100 - Math.abs(promedioMarca - promedioInfluencer);
  matchPct = Math.round(matchPct);
  
  let status = "Match Bajo";
  if (matchPct > 75) status = "Match Excelente";
  else if (matchPct > 50) status = "Match Bueno";
  
  return { porcentaje: matchPct, estado: status };
};