import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import { getInfluencers } from '../../infrastructure/match/InfluencerRepository';

export default function ConfiguracionScreen({ navigation }) {
  const [creatividad, setCreatividad] = useState(80);
  const [seriedad, setSeriedad] = useState(50);
  const [sociabilidad, setSociabilidad] = useState(70);
  const [empatia, setEmpatia] = useState(60);
  const [estabilidad, setEstabilidad] = useState(20);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const influencers = getInfluencers();

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
        influencer: selectedInfluencer 
      });
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Configura tu ADN</Text>
        <Text style={styles.subtitle}>Desliza para definir la personalidad que buscas:</Text>

        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}><Text style={styles.sliderLabel}>Creatividad</Text><Text style={styles.sliderValue}>{creatividad}%</Text></View>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={creatividad} onValueChange={setCreatividad} minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action} />
        </View>

        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}><Text style={styles.sliderLabel}>Seriedad</Text><Text style={styles.sliderValue}>{seriedad}%</Text></View>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={seriedad} onValueChange={setSeriedad} minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action} />
        </View>

        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}><Text style={styles.sliderLabel}>Sociabilidad</Text><Text style={styles.sliderValue}>{sociabilidad}%</Text></View>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={sociabilidad} onValueChange={setSociabilidad} minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action} />
        </View>

        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}><Text style={styles.sliderLabel}>Empatía</Text><Text style={styles.sliderValue}>{empatia}%</Text></View>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={empatia} onValueChange={setEmpatia} minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action} />
        </View>

        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}><Text style={styles.sliderLabel}>Estabilidad</Text><Text style={styles.sliderValue}>{estabilidad}%</Text></View>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={estabilidad} onValueChange={setEstabilidad} minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>2. Buscar Influencer</Text>
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.dropdownText}>{selectedInfluencer ? `@${selectedInfluencer.username}` : "Elegir influencer..."}</Text>
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

        <View style={{ marginTop: 10 }}>
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

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Base de Datos</Text>
            <FlatList
              data={influencers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectInfluencer(item)}>
                  <Text style={styles.modalItemName}>@{item.username}</Text>
                  <Text style={styles.modalItemSub}>{item.seguidores} seguidores • {item.arquetipo}</Text>
                </TouchableOpacity>
              )}
            />
            <CustomButton title="Cancelar" variant="primary" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: '900', color: COLORS.textLight, marginBottom: 8 },
  subtitle: { fontSize: 16, color: COLORS.textMuted, marginBottom: 30 },
  sliderGroup: { marginBottom: 24 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  sliderLabel: { color: COLORS.textLight, fontSize: 16, fontWeight: '600' },
  sliderValue: { color: COLORS.action, fontSize: 16, fontWeight: 'bold' },
  slider: { width: '100%', height: 40 },
  sectionContainer: { marginTop: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight, marginBottom: 10 },
  errorText: { color: COLORS.action, fontSize: 14, marginBottom: 10, fontWeight: 'bold' },
  dropdownButton: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.card, padding: 15, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  dropdownText: { color: COLORS.textLight, fontSize: 14 },
  dropdownIcon: { color: COLORS.textMuted },
  infoBox: { marginTop: 10, padding: 10, backgroundColor: 'rgba(37,244,238,0.1)', borderRadius: 8, borderWidth: 1, borderColor: COLORS.primary },
  infoText: { color: COLORS.primary, fontSize: 12, marginBottom: 2 },
  loadingContainer: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  loadingText: { color: COLORS.primary, marginTop: 10, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: COLORS.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '70%' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textLight, marginBottom: 15, textAlign: 'center' },
  modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  modalItemName: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  modalItemSub: { color: COLORS.textMuted, fontSize: 12, marginTop: 2 }
});