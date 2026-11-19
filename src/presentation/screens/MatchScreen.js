import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import RadarChart from '../components/RadarChart';
import { ejecutarCalculoMatch } from '../../application/match/calculateMatch';

export default function MatchScreen({ navigation, route }) {
  // Recibimos los datos de la Configuración (Marca e Influencer)
  const { marca, influencer } = route.params;

  // La regla de compatibilidad vive en el dominio (domain/match/MatchCalculator.js)
  const { porcentaje: matchPct, estado: status } = ejecutarCalculoMatch(marca, influencer);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>BrandMatch</Text>
        <Text style={styles.headerSubtitle}>Análisis de compatibilidad y ADN Digital</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver al buscador</Text>
        </TouchableOpacity>

        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
          
          {/* TARJETA 1: Nivel de Compatibilidad */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>NIVEL DE COMPATIBILIDAD</Text>
            <View style={styles.matchRow}>
              <Text style={styles.percentage}>{matchPct}%</Text>
              <Text style={[styles.matchStatus, { color: matchPct > 70 ? '#10B981' : '#F59E0B' }]}>{status}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{influencer.name}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Usuario</Text><Text style={styles.infoValue}>@{influencer.username}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Seguidores</Text><Text style={styles.infoValue}>{influencer.seguidores}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Arquetipo</Text><Text style={styles.infoValue}>{influencer.arquetipo}</Text></View>
          </View>

          {/* TARJETA 2: Gráfico Radar */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Comparativa Big Five</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: COLORS.primary }]} /><Text style={styles.legendText}>Influencer</Text></View>
              <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#334155' }]} /><Text style={styles.legendText}>Tu Marca</Text></View>
            </View>
            <RadarChart data={influencer.bigfive} />
          </View>

          <View style={styles.buttonWrapper}>
            <CustomButton title="Generar correo de colaboración" variant="action" onPress={() => navigation.navigate('Pitch', { influencer })} />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 40, width:'100%', maxWidt: 600, alignSel: 'center', },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textLight, textAlign: 'center', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginBottom: 20 },
  backButton: { backgroundColor: COLORS.action, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, alignSelf: 'flex-start', marginBottom: 20 },
  backButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  card: { backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardLabel: { fontSize: 12, fontWeight: 'bold', color: COLORS.textMuted, marginBottom: 8, letterSpacing: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.textLight, marginBottom: 15 },
  matchRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 15 },
  percentage: { fontSize: 48, fontWeight: '900', color: COLORS.primary },
  matchStatus: { fontSize: 16, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { fontSize: 14, color: COLORS.textMuted },
  infoValue: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  legendRow: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { fontSize: 12, color: COLORS.textMuted },
  buttonWrapper: { marginTop: 10 }
});