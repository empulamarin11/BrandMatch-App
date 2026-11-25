
import React, { useEffect, useRef, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Heartbeat,
  ArrowLeft,
  Target,
  User,
  At,
  UsersThree,
  MaskHappy,
  ChartPolar,
} from 'phosphor-react-native';

import { COLORS } from '../theme/colors';
import { AppText } from '../components/atoms/AppText';
import CustomButton from '../components/atoms/CustomButton';
import RadarChart from '../components/RadarChart';
import { ejecutarCalculoMatch } from '../../application/match/calculateMatch';

export default function MatchScreen({ navigation, route }) {
  const { marca, influencer } = route.params;

  const { porcentaje: matchPct, estado: status } =
    ejecutarCalculoMatch(marca, influencer);

  const { width, height } = useWindowDimensions();

  const compact = height < 520;
  const row = width > height && width >= 600;

  const styles = useMemo(
    () => createStyles(compact, row),
    [compact, row]
  );

  const radarMax = row
    ? Math.min(width / 2 - 70, 300)
    : compact
      ? 240
      : 340;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  // Los umbrales coinciden con MatchCalculator.js
  const statusColor =
    matchPct > 75
      ? '#10B981'
      : matchPct > 50
        ? '#F59E0B'
        : COLORS.error;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <Heartbeat
            size={compact ? 25 : 30}
            color={COLORS.primary}
            weight="fill"
          />

          <AppText
            variant="title"
            color="textLight"
            style={styles.headerTitle}
          >
            BrandMatch
          </AppText>
        </View>

        <AppText
          variant="body"
          color="textMuted"
          style={styles.headerSubtitle}
        >
          Análisis de compatibilidad y ADN Digital
        </AppText>

        {/* VOLVER */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={18} color="#FFFFFF" weight="bold" />

          <AppText
            variant="body"
            color="#FFFFFF"
            style={styles.backButtonText}
          >
            Volver al buscador
          </AppText>
        </TouchableOpacity>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View style={styles.cardsRow}>

            {/* TARJETA DE COMPATIBILIDAD */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <Target
                  size={20}
                  color={COLORS.primary}
                  weight="bold"
                />

                <AppText
                  variant="caption"
                  color="textMuted"
                  style={styles.cardLabel}
                >
                  NIVEL DE COMPATIBILIDAD
                </AppText>
              </View>

              <View style={styles.matchRow}>
                <AppText
                  variant="title"
                  color="primary"
                  style={styles.percentage}
                >
                  {matchPct}%
                </AppText>

                <AppText
                  variant="subtitle"
                  color={statusColor}
                  style={styles.matchStatus}
                >
                  {status}
                </AppText>
              </View>

              <View style={styles.divider} />

              {/* NOMBRE */}
              <View style={styles.infoRow}>
                <View style={styles.infoLabelContainer}>
                  <User
                    size={17}
                    color={COLORS.primary}
                    weight="bold"
                  />

                  <AppText variant="body" color="textMuted">
                    Nombre
                  </AppText>
                </View>

                <AppText
                  variant="body"
                  color="textLight"
                  style={styles.infoValue}
                >
                  {influencer.name}
                </AppText>
              </View>

              {/* USUARIO */}
              <View style={styles.infoRow}>
                <View style={styles.infoLabelContainer}>
                  <At
                    size={17}
                    color={COLORS.primary}
                    weight="bold"
                  />

                  <AppText variant="body" color="textMuted">
                    Usuario
                  </AppText>
                </View>

                <AppText
                  variant="body"
                  color="textLight"
                  style={styles.infoValue}
                >
                  @{influencer.username}
                </AppText>
              </View>

              {/* SEGUIDORES */}
              <View style={styles.infoRow}>
                <View style={styles.infoLabelContainer}>
                  <UsersThree
                    size={17}
                    color={COLORS.primary}
                    weight="bold"
                  />

                  <AppText variant="body" color="textMuted">
                    Seguidores
                  </AppText>
                </View>

                <AppText
                  variant="body"
                  color="textLight"
                  style={styles.infoValue}
                >
                  {influencer.seguidores}
                </AppText>
              </View>

              {/* ARQUETIPO */}
              <View style={styles.infoRow}>
                <View style={styles.infoLabelContainer}>
                  <MaskHappy
                    size={17}
                    color={COLORS.primary}
                    weight="bold"
                  />

                  <AppText variant="body" color="textMuted">
                    Arquetipo
                  </AppText>
                </View>

                <AppText
                  variant="body"
                  color="textLight"
                  style={styles.infoValue}
                >
                  {influencer.arquetipo}
                </AppText>
              </View>
            </View>

            {/* TARJETA DEL RADAR */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <ChartPolar
                  size={21}
                  color={COLORS.primary}
                  weight="bold"
                />

                <AppText
                  variant="subtitle"
                  color="textLight"
                  style={styles.cardTitle}
                >
                  Comparativa Big Five
                </AppText>
              </View>

              {/* LEYENDA */}
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: COLORS.primary },
                    ]}
                  />

                  <AppText variant="caption" color="textMuted">
                    Influencer
                  </AppText>
                </View>

                <View style={styles.legendItem}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: '#334155' },
                    ]}
                  />

                  <AppText variant="caption" color="textMuted">
                    Tu Marca
                  </AppText>
                </View>
              </View>

              <RadarChart
                data={influencer.bigfive}
                marca={marca}
                maxSize={radarMax}
              />
            </View>
          </View>

          {/* BOTÓN DE PITCH */}
          <View style={styles.buttonWrapper}>
            <CustomButton
              title="Generar correo de colaboración"
              variant="action"
              onPress={() =>
                navigation.navigate('Pitch', { influencer })
              }
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (compact, row) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },

    content: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: compact ? 14 : 30,
      width: '100%',
      maxWidth: row ? 900 : 600,
      alignSelf: 'center',
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
    },

    headerTitle: {
      fontSize: compact ? 22 : 28,
      lineHeight: compact ? 28 : 36,
      fontFamily: 'Inter_700Bold',
      textAlign: 'center',
      marginBottom: 4,
    },

    headerSubtitle: {
      fontSize: compact ? 12 : 14,
      lineHeight: compact ? 16 : 20,
      textAlign: 'center',
      marginBottom: compact ? 10 : 20,
    },

    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: COLORS.action,
      paddingVertical: compact ? 6 : 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginBottom: compact ? 10 : 20,
    },

    backButtonText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
      lineHeight: 20,
    },

    cardsRow: row
      ? {
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: 16,
        }
      : {},

    card: {
      flex: row ? 1 : undefined,
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      borderRadius: 16,
      padding: compact ? 14 : 20,
      marginBottom: row ? 0 : compact ? 10 : 16,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
      minWidth: 0,
    },

    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 9,
      marginBottom: 8,
    },

    cardLabel: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'Inter_700Bold',
      letterSpacing: 1,
      marginBottom: 0,
    },

    cardTitle: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: 'Inter_700Bold',
      marginBottom: 0,
    },

    matchRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: compact ? 8 : 15,
      flexWrap: 'wrap',
      gap: 8,
    },

    percentage: {
      fontSize: compact ? 36 : 48,
      lineHeight: compact ? 42 : 56,
      fontFamily: 'Inter_700Bold',
    },

    matchStatus: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: 'Inter_700Bold',
    },

    divider: {
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.1)',
      marginBottom: compact ? 8 : 15,
    },

    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: compact ? 8 : 12,
      flexWrap: 'wrap',
      gap: 8,
    },

    infoLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
    },

    infoValue: {
      fontFamily: 'Inter_600SemiBold',
      textAlign: 'right',
      flexShrink: 1,
    },

    legendRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 20,
      marginBottom: 10,
    },

    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },

    buttonWrapper: {
      marginTop: compact ? 8 : row ? 16 : 10,
    },
  });
