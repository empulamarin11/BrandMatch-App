import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../theme/colors';

const { width } = Dimensions.get('window');

export default function RadarChart({ data }) {
  const rawData = data || { a: 30, r: 20, e: 30, am: 15, n: 5 };
  const values = [rawData.r, rawData.a, rawData.n, rawData.am, rawData.e];
  
  // 🚨 SOLUCIÓN: Acortamos las palabras que son muy largas
  const labels = ['Responsab.', 'Apertura', 'Neurot.', 'Amabilidad', 'Extraver.'];

  const size = width - 120; 
  const center = size / 2;
  const radius = size * 0.3; 

  const getPoint = (value, index) => {
    const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
    return {
      x: center + (radius * (value / 100)) * Math.cos(angle),
      y: center + (radius * (value / 100)) * Math.sin(angle)
    };
  };

  const polygonPoints = values.map((value, index) => {
    const { x, y } = getPoint(value, index);
    return `${x},${y}`;
  }).join(' ');

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        {[0.33, 0.66, 1].map((level, i) => {
          const webPoints = values.map((_, index) => {
            const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
            return `${center + (radius * level) * Math.cos(angle)},${center + (radius * level) * Math.sin(angle)}`;
          }).join(' ');
          return <Polygon key={i} points={webPoints} stroke="#334155" strokeWidth="1" fill="none" />;
        })}

        {values.map((_, index) => {
          const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
          return <Line key={index} x1={center} y1={center} x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)} stroke="#334155" strokeWidth="1" />;
        })}

        <Polygon points={polygonPoints} fill={COLORS.primary} fillOpacity="0.4" stroke={COLORS.primary} strokeWidth="2" />

        {values.map((_, index) => {
          const angle = (Math.PI * 2 * index) / values.length - Math.PI / 2;
          
          // Ajustamos las posiciones milimétricamente
          const labelX = center + (radius + 20) * Math.cos(angle);
          const labelY = center + (radius + 20) * Math.sin(angle);
          
          let textAnchor = "middle";
          if (index === 1 || index === 2) textAnchor = "start";
          if (index === 3 || index === 4) textAnchor = "end";

          return (
            <SvgText 
              key={index} 
              x={labelX} 
              y={labelY + 4} 
              fill={COLORS.textMuted} 
              fontSize="9"
              fontWeight="bold" 
              textAnchor={textAnchor}
            >
              {labels[index]}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginVertical: 10,
    width: '100%',
    overflow: 'hidden'
  }
});