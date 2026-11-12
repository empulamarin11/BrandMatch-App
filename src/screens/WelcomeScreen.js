import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';

export default function WelcomeScreen({ navigation }) {
  // Variables para las animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current; // Para el texto
  const slideAnim = useRef(new Animated.Value(50)).current; // Para deslizar desde abajo
  const heartbeatAnim = useRef(new Animated.Value(1)).current; // Para el corazón

  useEffect(() => {
    // 1. Animación de entrada (Aparecer y subir)
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: true })
    ]).start();

    // 2. Animación de latido infinito para el emoji
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeatAnim, { toValue: 1.2, duration: 600, useNativeDriver: true }),
        Animated.timing(heartbeatAnim, { toValue: 1, duration: 600, useNativeDriver: true })
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Logo y Emoji animados */}
        <Animated.View style={[
          styles.logoContainer, 
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <Text style={styles.title}>BrandMatch</Text>
          
          {/* El corazón late */}
          <Animated.Text style={[styles.emoji, { transform: [{ scale: heartbeatAnim }] }]}>
            🤝
          </Animated.Text>
        </Animated.View>

        <Text style={styles.subtitle}>El futuro del marketing no es adivinar.</Text>

        {/* Botón Start animado */}
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
          <CustomButton 
            title="Empezar ahora" 
            variant="action" 
            onPress={() => navigation.replace('Login')} // Usamos replace para que no pueda volver atrás con el botón físico
          />
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: '900',
    color: COLORS.primary, // Cian
    letterSpacing: -2,
  },
  emoji: {
    fontSize: 60,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 50, // Botón pegado abajo
    paddingHorizontal: 24,
  }
});