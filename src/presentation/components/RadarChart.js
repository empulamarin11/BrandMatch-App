
import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, {
  Polygon,
  Line,
  Text as SvgText,
} from 'react-native-svg';

import { COLORS } from '../theme/colors';

const LABELS = [
  'Responsab.',
  'Apertura',
  'Neurot.',
  'Amabilidad',
  'Extraver.',
];

const DEFAULT_DATA = {
  a: 30,
  r: 20,
  e: 30,
  am: 15,
  n: 5,
};

export default function RadarChart({
  data,
  marca,
  maxSize = 340,
}) {
  const { width } = useWindowDimensions();

  // Datos del influencer
  const rawData = data || DEFAULT_DATA;

  const values = [
    rawData.r,
    rawData.a,
    rawData.n,
    rawData.am,
    rawData.e,
  ].map((v) =>
    Math.max(0, Math.min(100, Number(v) || 0))
  );

  // Conversión de los rasgos de la marca al orden Big Five
  const brandValues = marca
    ? [
        marca.seriedad,
        marca.creatividad,
        marca.estabilidad,
        marca.empatia,
        marca.sociabilidad,
      ].map((v) =>
        Math.max(0, Math.min(100, Number(v) || 0))
      )
    : null;

  const size = Math.max(
    200,
    Math.min(width - 32, maxSize)
  );

  const center = size / 2;
  const radius = size * 0.3;
  const labelOffset = 22;
  const fontSize = size < 280 ? 9 : 11;

  const angleOf = (index) =>
    (Math.PI * 2 * index) / values.length - Math.PI / 2;

  const pointAt = (index, r) => ({
    x: center + r * Math.cos(angleOf(index)),
    y: center + r * Math.sin(angleOf(index)),
  });

  const toPoints = (pts) =>
    pts.map((p) => `${p.x},${p.y}`).join(' ');

  const polygonPoints = toPoints(
    values.map((v, i) =>
      pointAt(i, radius * (v / 100))
    )
  );

  const brandPolygonPoints = brandValues
    ? toPoints(
        brandValues.map((v, i) =>
          pointAt(i, radius * (v / 100))
        )
      )
    : null;

  const getAnchor = (index) => {
    const cos = Math.cos(angleOf(index));

    if (Math.abs(cos) < 0.2) return 'middle';

    return cos > 0 ? 'start' : 'end';
  };

  return (
    <View style={styles.container}>
      <Svg
        height={size}
        width={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* MALLA DEL RADAR */}
        {[0.33, 0.66, 1].map((level) => (
          <Polygon
            key={level}
            points={toPoints(
              values.map((_, i) =>
                pointAt(i, radius * level)
              )
            )}
            stroke="#334155"
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* EJES */}
        {values.map((_, i) => {
          const end = pointAt(i, radius);

          return (
            <Line
              key={i}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#334155"
              strokeWidth="1"
            />
          );
        })}

        {/* POLÍGONO DE LA MARCA */}
        {brandPolygonPoints && (
          <Polygon
            points={brandPolygonPoints}
            fill="#334155"
            fillOpacity="0.25"
            stroke="#64748B"
            strokeWidth="2"
          />
        )}

        {/* POLÍGONO DEL INFLUENCER */}
        <Polygon
          points={polygonPoints}
          fill={COLORS.primary}
          fillOpacity="0.4"
          stroke={COLORS.primary}
          strokeWidth="2"
        />

        {/* ETIQUETAS */}
        {values.map((_, i) => {
          const p = pointAt(i, radius + labelOffset);

          return (
            <SvgText
              key={i}
              x={p.x}
              y={p.y + 4}
              fill={COLORS.textMuted}
              fontSize={fontSize}
              fontFamily="Inter_500Medium"
              textAnchor={getAnchor(i)}
            >
              {LABELS[i]}
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
  },
});
