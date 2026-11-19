import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { getInfluencers } from '../../infrastructure/match/InfluencerRepository';

export default function ConfiguracionScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const compact = height < 520;                    // 16:9 horizontal o 1:1 compacto
  const row = width > height && width >= 600;      // horizontal con espacio para 2 columnas
  const styles = useMemo(() => createStyles(compact, row), [compact, row]);

  // ESTADOS DEL BIG FIVE (5 SLIDERS)
  const [creatividad, setCreatividad] = useState(80);
  const [seriedad, setSeriedad] = useState(50);
  const [sociabilidad, setSociabilidad] = useState(70);
  const [empatia, setEmpatia] = useState(60);
  const [estabilidad, setEstabilidad] = useState(20);

  // ESTADOS DEL BUSCADOR
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const influencers = getInfluencers();

  const sliders = [
    { label: 'Creatividad', value: creatividad, onChange: setCreatividad },
    { label: 'Seriedad', value: seriedad, onChange: setSeriedad },
    { label: 'Sociabilidad', value: sociabilidad, onChange: setSociabilidad },
    { label: 'Empatía', value: empatia, onChange: setEmpatia },
    { label: 'Estabilidad', value: estabilidad, onChange: setEstabilidad },
  ];

  const handleSelectInfluencer = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalVisible(false);
    setErrorMsg('');
  };

  const handleBuscar = () => {
    if (!selectedInfluencer) {
      setErrorMsg('⚠️ Selecciona un influencer primero.');
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Configura tu ADN</Text>
        <Text style={styles.subtitle}>Desliza para definir la personalidad de tu marca:</Text>

        <View style={styles.cardsRow}>
          {/* SECCIÓN 1: SLIDERS */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>1. Configura el ADN de tu Marca</Text>

            {sliders.map((item) => (
              <View key={item.label} style={styles.sliderGroup}>
                <View style={styles.sliderHeader}>
                  <Text style={styles.sliderLabel}>{item.label}</Text>
                  <Text style={styles.sliderValue}>{item.value}%</Text>
                </View>

                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  value={item.value}
                  onValueChange={item.onChange}
                  minimumTrackTintColor={COLORS.primary}
                  maximumTrackTintColor={COLORS.card}
                  thumbTintColor={COLORS.action}
                />
              </View>
            ))}
          </View>

          {/* SECCIÓN 2: BUSCADOR DE INFLUENCER */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>2. Buscar Influencer</Text>
            <Text style={styles.sectionSubtitle}>Selecciona un perfil de la base de datos:</Text>

            {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

            <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsModalVisible(true)}>
              <Text style={styles.dropdownText}>
                {selectedInfluencer ? `@${selectedInfluencer.username}` : 'Elegir influencer...'}
              </Text>
              <Text style={styles.dropdownIcon}>▼</Text>
            </TouchableOpacity>

            {selectedInfluencer && (
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>Nombre: {selectedInfluencer.name}</Text>
                <Text style={styles.infoText}>Seguidores: {selectedInfluencer.seguidores}</Text>
                <Text style={styles.infoText}>Arquetipo: {selectedInfluencer.arquetipo}</Text>
              </View>
            )}
          </View>
        </View>

        {/* BOTÓN FINAL */}
        <View style={styles.finalButton}>
          {isCalculating ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Calculando Match...</Text>
            </View>
          ) : (
            <CustomButton title="Ver Análisis Match" variant="action" onPress={handleBuscar} />
          )}
        </View>
      </ScrollView>

      {/* MODAL: VENTANA EMERGENTE */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Base de Datos de Influencers</Text>

            <FlatList
              data={influencers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectInfluencer(item)}
                >
                  <Text style={styles.modalItemName}>@{item.username}</Text>
                  <Text style={styles.modalItemSub}>
                    {item.seguidores} seguidores • {item.arquetipo}
                  </Text>
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
    </SafeAreaView>
  );
}

const createStyles = (compact, row) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: compact ? 14 : 30,
      width: '100%',
      maxWidth: row ? 900 : 600,
      alignSelf: 'center',
    },

    title: {
      fontSize: compact ? 22 : 28,
      fontWeight: '900',
      color: COLORS.textLight,
      marginBottom: 5,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: compact ? 12 : 14,
      color: COLORS.textMuted,
      marginBottom: compact ? 10 : 20,
      textAlign: 'center',
    },

    // En horizontal ancho: sliders y buscador lado a lado
    cardsRow: row ? { flexDirection: 'row', alignItems: 'flex-start', gap: 16 } : {},

    sectionCard: {
      flex: row ? 1 : undefined,
      backgroundColor: 'rgba(30, 41, 59, 0.5)',
      borderRadius: 16,
      padding: compact ? 14 : 20,
      marginBottom: row ? 0 : compact ? 10 : 15,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
    },

    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.textLight,
      marginBottom: compact ? 10 : 15,
    },
    sectionSubtitle: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginBottom: 10,
    },

    errorText: {
      color: COLORS.action,
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold',
    },

    sliderGroup: { marginBottom: compact ? 6 : 15 },
    sliderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    sliderLabel: { color: COLORS.textLight, fontSize: 14, fontWeight: '600' },
    sliderValue: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold' },
    slider: { width: '100%', height: 30 },

    dropdownButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: COLORS.card,
      padding: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.1)',
    },
    dropdownText: { color: COLORS.textLight, fontSize: 14 },
    dropdownIcon: { color: COLORS.textMuted },

    infoBox: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'rgba(37,244,238,0.1)',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: COLORS.primary,
    },
    infoText: { color: COLORS.primary, fontSize: 12, marginBottom: 2 },

    finalButton: { marginTop: compact ? 4 : 10 },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: compact ? 8 : 20,
    },
    loadingText: { color: COLORS.primary, marginTop: 10, fontWeight: 'bold' },

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
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.textLight,
      marginBottom: 15,
      textAlign: 'center',
    },
    modalItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    modalItemName: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
    modalItemSub: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 },
  });