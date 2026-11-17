import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';

export default function ConfiguracionScreen({ navigation }) {
  // Estados para los 5 rasgos del Big Five
  const [creatividad, setCreatividad] = useState(80);
  const [seriedad, setSeriedad] = useState(50);
  const [sociabilidad, setSociabilidad] = useState(70);
  const [empatia, setEmpatia] = useState(60);
  const [estabilidad, setEstabilidad] = useState(20);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Configura tu ADN</Text>
        <Text style={styles.subtitle}>Desliza para definir la personalidad que buscas:</Text>

        {/* Slider 1: Creatividad */}
        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Creatividad</Text>
            <Text style={styles.sliderValue}>{creatividad}%</Text>
          </View>
          <Slider
            style={styles.slider} minimumValue={0} maximumValue={100} step={1}
            value={creatividad} onValueChange={setCreatividad}
            minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action}
          />
        </View>

        {/* Slider 2: Seriedad */}
        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Seriedad</Text>
            <Text style={styles.sliderValue}>{seriedad}%</Text>
          </View>
          <Slider
            style={styles.slider} minimumValue={0} maximumValue={100} step={1}
            value={seriedad} onValueChange={setSeriedad}
            minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action}
          />
        </View>

        {/* Slider 3: Sociabilidad */}
        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Sociabilidad</Text>
            <Text style={styles.sliderValue}>{sociabilidad}%</Text>
          </View>
          <Slider
            style={styles.slider} minimumValue={0} maximumValue={100} step={1}
            value={sociabilidad} onValueChange={setSociabilidad}
            minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action}
          />
        </View>

        {/* Slider 4: Empatía */}
        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Empatía</Text>
            <Text style={styles.sliderValue}>{empatia}%</Text>
          </View>
          <Slider
            style={styles.slider} minimumValue={0} maximumValue={100} step={1}
            value={empatia} onValueChange={setEmpatia}
            minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action}
          />
        </View>

        {/* Slider 5: Estabilidad */}
        <View style={styles.sliderGroup}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Estabilidad</Text>
            <Text style={styles.sliderValue}>{estabilidad}%</Text>
          </View>
          <Slider
            style={styles.slider} minimumValue={0} maximumValue={100} step={1}
            value={estabilidad} onValueChange={setEstabilidad}
            minimumTrackTintColor={COLORS.primary} maximumTrackTintColor={COLORS.card} thumbTintColor={COLORS.action}
          />
        </View>

        {/* Botón para continuar */}
        <View style={{ marginTop: 20 }}>
          <CustomButton 
            title="Buscar Influencers" variant="action" 
            // Aquí pasamos los datos a la siguiente pantalla
            onPress={() => navigation.navigate('Match', { 
              creatividad, seriedad, sociabilidad, empatia, estabilidad 
            })} 
          />
        </View>
      </ScrollView>
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
  slider: { width: '100%', height: 40 }
});