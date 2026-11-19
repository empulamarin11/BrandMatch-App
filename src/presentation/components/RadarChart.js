import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText } from 'react-native-svg';
import { COLORS } from '../theme/colors';

export default function RadarChart({ data }) {
  const { width, height } = useWindowDimensions();

  const rawData = data || {
    a: 30,
    r: 20,
    e: 30,
    am: 15,
    n: 5,
  };

  const values = [
    rawData.r,
    rawData.a,
    rawData.n,
    rawData.am,
    rawData.e,
  ];

  const labels = [
    'Responsab.',
    'Apertura',
    'Neurot.',
    'Amabilidad',
    'Extraver.',
  ];

  // Calcula el tamaño del gráfico según las dimensiones disponibles.
  const minSide = Math.min(width, height);
  const size = Math.max(160, Math.min(minSide - 70, 310));

  const center = size / 2;
  const radius = size * 0.29;

  const getPoint = (value, index) => {
    const angle =
      (Math.PI * 2 * index) / values.length - Math.PI / 2;

    return {
      x: center + (radius * (value / 100)) * Math.cos(angle),
      y: center + (radius * (value / 100)) * Math.sin(angle),
    };
  };

  // Puntos del polígono principal.
  const polygonPoints = values
    .map((value, index) => {
      const { x, y } = getPoint(value, index);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        {/* Líneas de referencia */}
        {[0.33, 0.66, 1].map((level, i) => {
          const webPoints = values
            .map((_, index) => {
              const angle =
                (Math.PI * 2 * index) / values.length - Math.PI / 2;

              const x = center + radius * level * Math.cos(angle);
              const y = center + radius * level * Math.sin(angle);

              return `${x},${y}`;
            })
            .join(' ');

          return (
            <Polygon
              key={i}
              points={webPoints}
              stroke="#334155"
              strokeWidth="1"
              fill="none"
            />
          );
        })}

        {/* Líneas desde el centro */}
        {values.map((_, index) => {
          const angle =
            (Math.PI * 2 * index) / values.length - Math.PI / 2;

          return (
            <Line
              key={index}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="#334155"
              strokeWidth="1"
            />
          );
        })}

        {/* Polígono de resultados */}
        <Polygon
          points={polygonPoints}
          fill={COLORS.primary}
          fillOpacity="0.4"
          stroke={COLORS.primary}
          strokeWidth="2"
        />

        {/* Etiquetas */}
        {values.map((_, index) => {
          const angle =
            (Math.PI * 2 * index) / values.length - Math.PI / 2;

          const labelX = center + (radius + 18) * Math.cos(angle);
          const labelY = center + (radius + 18) * Math.sin(angle);

          let textAnchor = 'middle';

          if (index === 1 || index === 2) {
            textAnchor = 'start';
          }

          if (index === 3 || index === 4) {
            textAnchor = 'end';
          }

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
    overflow: 'hidden',
  },
});