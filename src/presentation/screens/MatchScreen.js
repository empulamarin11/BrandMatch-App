import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';
import RadarChart from '../components/RadarChart';

export default function MatchScreen({ navigation, route }) {
  // 1. Recibimos los datos de los sliders (si no vienen, usamos valores por defecto)
  const { 
    creatividad = 80, 
    seriedad = 50, 
    sociabilidad = 70, 
    empatia = 60, 
    estabilidad = 20 
  } = route.params || {};

  // 2. Calculamos el "Match" basado en el promedio de los sliders
  const promedio = (creatividad + seriedad + sociabilidad + empatia + estabilidad) / 5;
  const porcentajeMatch = Math.round(promedio);

  // 3. Animaciones de entrada
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Análisis de Match</Text>
        
        {/* Contenedor animado */}
        <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          
          {/* EFECTO CRISTAL (Glassmorphism) */}
          <BlurView intensity={60} tint="dark" style={styles.blurContainer}>
            
            <View style={styles.matchCircle}>
              <Text style={styles.matchNumber}>{porcentajeMatch}%</Text>
              <Text style={styles.matchText}>MATCH</Text>
            </View>
            
            <Text style={styles.influencerName}>@alex_acoustic</Text>
            
            <RadarChart />

            <View style={{ marginTop: 20, width: '100%' }}>
              <CustomButton 
                title="Generar Pitch con IA" variant="primary" 
                onPress={() => navigation.navigate('Pitch')} 
              />
            </View>
            
          </BlurView>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  content: { 
    paddingHorizontal: 24, 
    paddingTop: 40, 
    paddingBottom: 40 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: COLORS.textLight, 
    marginBottom: 30 
  },
  card: { 
    borderRadius: 20, 
    overflow: 'hidden', // Crucial para que el cristal respete los bordes redondeados
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.15)' 
  },
  blurContainer: {
    padding: 24, 
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)', // Le da un toque de color al cristal
  },
  matchCircle: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 8, 
    borderColor: COLORS.primary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  matchNumber: { 
    fontSize: 32, 
    fontWeight: '900', 
    color: COLORS.primary 
  },
  matchText: { 
    fontSize: 12, 
    color: COLORS.textMuted, 
    fontWeight: 'bold', 
    letterSpacing: 2 
  },
  influencerName: { 
    fontSize: 20, 
    color: COLORS.textLight, 
    fontWeight: 'bold', 
    marginBottom: 10 
  }
});