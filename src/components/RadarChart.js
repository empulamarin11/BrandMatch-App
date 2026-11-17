import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../theme/colors';

// Recibimos los datos por props
export default function RadarChart({ data }) {
  // Si no hay datos (por si acaso), usamos unos por defecto
  const rawData = data || { a: 30, r: 20, e: 30, am: 15, n: 5 };
  
  // Convertimos el JSON a un array en el orden del gráfico
  const values = [rawData.r, rawData.a, rawData.n, rawData.am, rawData.e]; 
  const labels = ['Responsabilidad', 'Apertura', 'Neuroticismo', 'Amabilidad', 'Extraversión'];
  
  const size = 240;
  const center = size / 2;
  const radius = 80;

  const getPoint = (value, index) => {
    const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
    const x = center + (radius * (value / 100)) * Math.cos(angle);
    const y = center + (radius * (value / 100)) * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = values.map((value, index) => {
    const { x, y } = getPoint(value, index);
    return `${x},${y}`;
  }).join(' ');

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        {/* Telaraña de fondo */}
        {[0.33, 0.66, 1].map((level, i) => {
          const webPoints = values.map((_, index) => {
            const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
            const x = center + (radius * level) * Math.cos(angle);
            const y = center + (radius * level) * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');
          return <Polygon key={i} points={webPoints} stroke="#334155" strokeWidth="1" fill="none" />;
        })}

        {/* Líneas del centro */}
        {values.map((_, index) => {
          const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return <Line key={index} x1={center} y1={center} x2={x} y2={y} stroke="#334155" strokeWidth="1" />;
        })}

        {/* Polígono de datos */}
        <Polygon points={polygonPoints} fill={COLORS.primary} fillOpacity="0.4" stroke={COLORS.primary} strokeWidth="2" />

        {/* Textos */}
        {values.map((_, index) => {
          const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
          const labelX = center + (radius + 25) * Math.cos(angle);
          const labelY = center + (radius + 25) * Math.sin(angle);
          
          let textAnchor = "middle";
          if (index === 1 || index === 2) textAnchor = "start";
          if (index === 3 || index === 4) textAnchor = "end";

          return (
            <SvgText key={index} x={labelX} y={labelY + 4} fill={COLORS.textMuted} fontSize="9" fontWeight="bold" textAnchor={textAnchor}>
              {labels[index]}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginVertical: 10 }
});