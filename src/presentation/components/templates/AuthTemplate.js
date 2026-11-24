/**
 * AuthTemplate — Plantilla reutilizable de contenedor responsivo.
 *
 * Soporta:
 *   - Orientación vertical 9:16  (portrait)
 *   - Orientación horizontal 16:9 (landscape) con ancho máximo controlado
 *
 * Props:
 *   children      ReactNode — contenido de la pantalla
 *   scrollable    boolean   — envolver en ScrollView (default: true)
 *   style         ViewStyle — estilo extra sobre el contenedor interno
 */

import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/colors';

export function AuthTemplate({ children, scrollable = true, style }) {
  const { width, height } = useWindowDimensions();

  // Modo horizontal: ancho > alto y al menos 600 px de ancho
  const isLandscape = width > height && width >= 600;
  // Modo compacto: altura menor de 520 px (ej. 16:9 horizontal en teléfono)
  const isCompact = height < 520;

  const maxContentWidth = isLandscape ? 900 : 600;
  const paddingV = isCompact ? 14 : 30;

  const inner = (
    <View
      style={[
        styles.inner,
        {
          maxWidth: maxContentWidth,
          paddingVertical: paddingV,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {inner}
        </ScrollView>
      ) : (
        <View style={styles.scroll}>{inner}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  inner: {
    width: '100%',
    alignSelf: 'center',
  },
});
