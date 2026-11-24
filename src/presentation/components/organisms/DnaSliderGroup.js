/**
 * DnaSliderGroup — Organismo
 *
 * Renderiza el grupo de sliders de calibración ADN / Big Five de la marca.
 * Usa AppText (Inter) y Phosphor Icons (phosphor-react-native).
 *
 * Props:
 *   sliders  Array<{ label: string, value: number, onChange: fn, icon?: ComponentType }>
 *   compact  boolean  — layout comprimido para pantallas 16:9 horizontal o pequeñas
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import {
  Brain,
  SmileyNervous,
  Users,
  Heart,
  Heartbeat,
} from 'phosphor-react-native';

import { AppText } from '../atoms/AppText';
import { COLORS } from '../../theme/colors';

/** Mapa de icono por etiqueta (fallback: Brain) */
const LABEL_ICONS = {
  Creatividad: Brain,
  Seriedad: SmileyNervous,
  Sociabilidad: Users,
  Empatía: Heart,
  Estabilidad: Heartbeat,
};

/**
 * Un slider individual con su icono, etiqueta y valor.
 */
function DnaSlider({ label, value, onChange, compact }) {
  const Icon = LABEL_ICONS[label] || Brain;
  const iconSize = compact ? 16 : 20;

  return (
    <View style={styles.sliderGroup}>
      {/* Cabecera: icono + etiqueta + valor */}
      <View style={styles.sliderHeader}>
        <View style={styles.labelRow}>
          <Icon size={iconSize} color={COLORS.primary} weight="bold" />
          <AppText
            variant="body"
            color="textLight"
            style={[styles.sliderLabel, compact && styles.sliderLabelCompact]}
          >
            {label}
          </AppText>
        </View>
        <AppText
          variant="body"
          color="primary"
          style={styles.sliderValue}
        >
          {value}%
        </AppText>
      </View>

      {/* Track del slider */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.card}
        thumbTintColor={COLORS.action}
      />
    </View>
  );
}

/**
 * DnaSliderGroup — grupo completo con título de sección.
 */
export function DnaSliderGroup({ sliders = [], compact = false }) {
  return (
    <View>
      {sliders.map((item) => (
        <DnaSlider
          key={item.label}
          label={item.label}
          value={item.value}
          onChange={item.onChange}
          compact={compact}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderGroup: {
    marginBottom: 12,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sliderLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  sliderLabelCompact: {
    fontSize: 12,
  },
  sliderValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  slider: {
    width: '100%',
    height: 30,
  },
});
