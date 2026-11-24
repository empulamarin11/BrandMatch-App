/**
 * ConfiguracionScreen
 *
 * Pantalla de configuración ADN de marca.
 * - Usa AppText (Inter) en lugar de <Text> nativo.
 * - Usa Phosphor Icons para el dropdown y la info del influencer.
 * - Usa el organismo DnaSliderGroup para los sliders Big Five.
 * - Usa AuthTemplate como contenedor responsivo (9:16 y 16:9).
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import {
  CaretDown,
  MagnifyingGlass,
  User,
  Users,
  Star,
  Warning,
  CircleNotch,
} from 'phosphor-react-native';

import { COLORS } from '../theme/colors';
import { AppText } from '../components/atoms/AppText';
import { DnaSliderGroup } from '../components/organisms/DnaSliderGroup';
import { AuthTemplate } from '../components/templates/AuthTemplate';
import CustomButton from '../components/atoms/CustomButton';
import { getInfluencers } from '../../infrastructure/match/InfluencerRepository';

export default function ConfiguracionScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const compact = height < 520;                    // 16:9 horizontal o compacto
  const row = width > height && width >= 600;      // horizontal con 2 columnas

  // ── ESTADOS BIG FIVE ────────────────────────────────────────────────────────
  const [creatividad, setCreatividad] = useState(80);
  const [seriedad, setSeriedad] = useState(50);
  const [sociabilidad, setSociabilidad] = useState(70);
  const [empatia, setEmpatia] = useState(60);
  const [estabilidad, setEstabilidad] = useState(20);

  // ── ESTADOS BUSCADOR ────────────────────────────────────────────────────────
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const influencers = getInfluencers();

  const sliders = [
    { label: 'Creatividad',  value: creatividad,  onChange: setCreatividad  },
    { label: 'Seriedad',     value: seriedad,     onChange: setSeriedad     },
    { label: 'Sociabilidad', value: sociabilidad, onChange: setSociabilidad },
    { label: 'Empatía',      value: empatia,      onChange: setEmpatia      },
    { label: 'Estabilidad',  value: estabilidad,  onChange: setEstabilidad  },
  ];

  // ── HANDLERS ────────────────────────────────────────────────────────────────
  const handleSelectInfluencer = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalVisible(false);
    setErrorMsg('');
  };

  const handleBuscar = () => {
    if (!selectedInfluencer) {
      setErrorMsg('Selecciona un influencer primero.');
      return;
    }
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      navigation.navigate('Match', {
        marca: { creatividad, seriedad, sociabilidad, empatia, estabilidad },
        influencer: selectedInfluencer,
      });
    }, 1200);
  };

  // ── ESTILOS DINÁMICOS ───────────────────────────────────────────────────────
  const styles = useMemo(() => createStyles(compact, row), [compact, row]);

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <AuthTemplate scrollable>
      {/* ── ENCABEZADO ── */}
      <AppText
        variant="title"
        color="textLight"
        style={[styles.title, compact && styles.titleCompact]}
      >
        Configura tu ADN
      </AppText>
      <AppText
        variant="body"
        color="textMuted"
        style={styles.subtitle}
      >
        Desliza para definir la personalidad de tu marca:
      </AppText>

      {/* ── CARDS ROW (layout horizontal) ── */}
      <View style={row ? styles.cardsRow : null}>

        {/* ── SECCIÓN 1: SLIDERS BIG FIVE ── */}
        <View style={[styles.sectionCard, row && styles.sectionCardRow]}>
          <AppText variant="subtitle" color="textLight" style={styles.sectionTitle}>
            1. Configura el ADN de tu Marca
          </AppText>

          <DnaSliderGroup sliders={sliders} compact={compact} />
        </View>

        {/* ── SECCIÓN 2: BUSCADOR DE INFLUENCER ── */}
        <View style={[styles.sectionCard, row && styles.sectionCardRow]}>
          <AppText variant="subtitle" color="textLight" style={styles.sectionTitle}>
            2. Buscar Influencer
          </AppText>
          <AppText variant="caption" color="textMuted" style={styles.sectionSubtitle}>
            Selecciona un perfil de la base de datos:
          </AppText>

          {/* Mensaje de error */}
          {errorMsg ? (
            <View style={styles.errorRow}>
              <Warning size={16} color={COLORS.action} weight="bold" />
              <AppText variant="body" color="action" style={styles.errorText}>
                {errorMsg}
              </AppText>
            </View>
          ) : null}

          {/* Dropdown */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsModalVisible(true)}
            activeOpacity={0.8}
          >
            <View style={styles.dropdownLeft}>
              <MagnifyingGlass size={16} color={COLORS.textMuted} />
              <AppText variant="body" color={selectedInfluencer ? 'textLight' : 'textMuted'} style={styles.dropdownText}>
                {selectedInfluencer ? `@${selectedInfluencer.username}` : 'Elegir influencer...'}
              </AppText>
            </View>
            <CaretDown size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          {/* Info del influencer seleccionado */}
          {selectedInfluencer && (
            <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                <User size={14} color={COLORS.primary} />
                <AppText variant="caption" color="primary" style={styles.infoText}>
                  {selectedInfluencer.name}
                </AppText>
              </View>
              <View style={styles.infoRow}>
                <Users size={14} color={COLORS.primary} />
                <AppText variant="caption" color="primary" style={styles.infoText}>
                  {selectedInfluencer.seguidores} seguidores
                </AppText>
              </View>
              <View style={styles.infoRow}>
                <Star size={14} color={COLORS.primary} />
                <AppText variant="caption" color="primary" style={styles.infoText}>
                  {selectedInfluencer.arquetipo}
                </AppText>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* ── BOTÓN FINAL ── */}
      <View style={styles.finalButton}>
        {isCalculating ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <AppText variant="body" color="primary" style={styles.loadingText}>
              Calculando Match...
            </AppText>
          </View>
        ) : (
          <CustomButton title="Ver Análisis Match" variant="action" onPress={handleBuscar} />
        )}
      </View>

      {/* ── MODAL: BUSCADOR DE INFLUENCERS ── */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText variant="subtitle" color="textLight" style={styles.modalTitle}>
              Base de Datos de Influencers
            </AppText>

            <FlatList
              data={influencers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectInfluencer(item)}
                  activeOpacity={0.75}
                >
                  <AppText variant="body" color="primary" style={styles.modalItemName}>
                    @{item.username}
                  </AppText>
                  <AppText variant="caption" color="textMuted" style={styles.modalItemSub}>
                    {item.seguidores} seguidores • {item.arquetipo}
                  </AppText>
                </TouchableOpacity>
              )}
            />

            <CustomButton
              title="Cancelar"
              variant="primary"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </AuthTemplate>
  );
}

// ── ESTILOS ──────────────────────────────────────────────────────────────────

const createStyles = (compact, row) =>
  StyleSheet.create({
    // Encabezado
    title: {
      fontSize: 28,
      marginBottom: 5,
      textAlign: 'center',
    },
    titleCompact: {
      fontSize: 22,
    },
    subtitle: {
      marginBottom: compact ? 10 : 20,
      textAlign: 'center',
    },

    // Layout de cards
    cardsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 16,
    },
    sectionCard: {
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      borderRadius: 16,
      padding: compact ? 14 : 20,
      marginBottom: compact ? 10 : 15,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },
    sectionCardRow: {
      flex: 1,
      marginBottom: 0,
    },

    // Títulos de sección
    sectionTitle: {
      marginBottom: compact ? 10 : 15,
    },
    sectionSubtitle: {
      marginBottom: 10,
    },

    // Error
    errorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 10,
    },
    errorText: {
      fontWeight: 'bold',
    },

    // Dropdown
    dropdownButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: COLORS.card,
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    dropdownLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    dropdownText: {
      flex: 1,
    },

    // Info box influencer
    infoBox: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'rgba(37,244,238,0.1)',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.primary,
      gap: 4,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    infoText: {
      flex: 1,
    },

    // Botón final
    finalButton: {
      marginTop: compact ? 4 : 10,
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: compact ? 8 : 20,
    },
    loadingText: {
      marginTop: 10,
      fontWeight: 'bold',
    },

    // Modal
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: COLORS.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      maxHeight: compact ? '90%' : '70%',
      width: '100%',
      maxWidth: 600,
      alignSelf: 'center',
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: 'center',
    },
    modalItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    modalItemName: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalItemSub: {
      marginTop: 2,
    },
  });
