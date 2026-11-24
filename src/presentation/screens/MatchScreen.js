import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import RadarChart from '../components/RadarChart';
import { ejecutarCalculoMatch } from '../../application/match/calculateMatch';

export default function MatchScreen({ navigation, route }) {
  const { marca, influencer } = route.params;
  const { porcentaje: matchPct, estado: status } = ejecutarCalculoMatch(marca, influencer);

  const { width, height } = useWindowDimensions();
  const compact = height < 520;                    // 16:9 horizontal o 1:1 compacto
  const row = width > height && width >= 600;      // horizontal con espacio para 2 columnas
  const styles = useMemo(() => createStyles(compact, row), [compact, row]);

  // Tamaño máximo del radar según el layout
  const radarMax = row ? Math.min(width / 2 - 70, 300) : compact ? 240 : 340;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>BrandMatch</Text>
        <Text style={styles.headerSubtitle}>Análisis de compatibilidad y ADN Digital</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver al buscador</Text>
        </TouchableOpacity>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          <View style={styles.cardsRow}>
            {/* TARJETA 1: NIVEL DE COMPATIBILIDAD */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>NIVEL DE COMPATIBILIDAD</Text>

              <View style={styles.matchRow}>
                <Text style={styles.percentage}>{matchPct}%</Text>
                <Text style={[styles.matchStatus, { color: matchPct > 70 ? '#10B981' : '#F59E0B' }]}>
                  {status}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{influencer.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Usuario</Text>
                <Text style={styles.infoValue}>@{influencer.username}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Seguidores</Text>
                <Text style={styles.infoValue}>{influencer.seguidores}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Arquetipo</Text>
                <Text style={styles.infoValue}>{influencer.arquetipo}</Text>
              </View>
            </View>

            {/* TARJETA 2: GRÁFICO RADAR */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Comparativa Big Five</Text>

              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: COLORS.primary }]} />
                  <Text style={styles.legendText}>Influencer</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: '#334155' }]} />
                  <Text style={styles.legendText}>Tu Marca</Text>
                </View>
              </View>

              <RadarChart data={influencer.bigfive} maxSize={radarMax} />
            </View>
          </View>

          {/* BOTÓN GENERAR CORREO */}
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Generar correo de colaboración"
              variant="action"
              onPress={() => navigation.navigate('Pitch', { influencer })}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (compact, row) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    content: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: compact ? 14 : 30,
      width: '100%',
      maxWidth: row ? 900 : 600,
      alignSelf: 'center',
    },

    headerTitle: {
      fontSize: compact ? 22 : 28,
      fontWeight: '900',
      color: COLORS.textLight,
      textAlign: 'center',
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: compact ? 12 : 14,
      color: COLORS.textMuted,
      textAlign: 'center',
      marginBottom: compact ? 10 : 20,
    },

    backButton: {
      backgroundColor: COLORS.action,
      paddingVertical: compact ? 6 : 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginBottom: compact ? 10 : 20,
    },
    backButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },

    // En horizontal ancho: las dos tarjetas lado a lado
    cardsRow: row ? { flexDirection: 'row', alignItems: 'stretch', gap: 16 } : {},

    card: {
      flex: row ? 1 : undefined,
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      borderRadius: 16,
      padding: compact ? 14 : 20,
      marginBottom: row ? 0 : compact ? 10 : 16,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },

    cardLabel: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.textMuted,
      marginBottom: 8,
      letterSpacing: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.textLight,
      marginBottom: compact ? 8 : 15,
    },

    matchRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: compact ? 8 : 15,
      flexWrap: 'wrap',
    },
    percentage: { fontSize: compact ? 36 : 48, fontWeight: '900', color: COLORS.primary },
    matchStatus: { fontSize: 16, fontWeight: 'bold' },

    divider: {
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.1)',
      marginBottom: compact ? 8 : 15,
    },

    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: compact ? 4 : 8,
      flexWrap: 'wrap',
    },
    infoLabel: { fontSize: 14, color: COLORS.textMuted },
    infoValue: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },

    legendRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 20,
      marginBottom: 10,
    },
    legendItem: { flexDirection: 'row', alignItems: 'center' },
    dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
    legendText: { fontSize: 12, color: COLORS.textMuted },

    buttonWrapper: { marginTop: compact ? 8 : row ? 16 : 10 },
  });