import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Polygon, Circle, Line } from 'react-native-svg';
import { COLORS } from '../theme/colors';

export default function RadarChart() {
  // Datos simulados del Big Five (0 a 100)
  const data = [80, 50, 70, 60, 20]; 
  const labels = ['Creatividad', 'Seriedad', 'Sociabilidad', 'Empatía', 'Estabilidad'];
  
  // Configuración del gráfico
  const size = 200;
  const center = size / 2;
  const radius = 80;

  // Calcular los puntos del polígono basado en los datos
  const points = data.map((value, index) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const x = center + (radius * (value / 100)) * Math.cos(angle);
    const y = center + (radius * (value / 100)) * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        {/* Círculos de fondo (las líneas del radar) */}
        <Circle cx={center} cy={center} r={radius} stroke={COLORS.card} strokeWidth="1" fill="none" />
        <Circle cx={center} cy={center} r={radius * 0.66} stroke={COLORS.card} strokeWidth="1" fill="none" />
        <Circle cx={center} cy={center} r={radius * 0.33} stroke={COLORS.card} strokeWidth="1" fill="none" />

        {/* Líneas desde el centro */}
        {data.map((_, index) => {
          const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return <Line key={index} x1={center} y1={center} x2={x} y2={y} stroke={COLORS.card} strokeWidth="1" />;
        })}

        {/* El polígono de datos (Cian con transparencia) */}
        <Polygon points={points} fill={COLORS.primary} fillOpacity="0.3" stroke={COLORS.primary} strokeWidth="2" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  }
});