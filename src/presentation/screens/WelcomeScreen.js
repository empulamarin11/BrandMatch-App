
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }) {
  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;
  const heartbeatAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Latido del corazón
    const heartbeat = Animated.loop(
      Animated.sequence([
        Animated.timing(heartbeatAnim, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(heartbeatAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    heartbeat.start();

    return () => heartbeat.stop();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0B0F19"
      />

      <View style={styles.content}>

        {/* LOGOTIPO */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.logoRow}>
            <Text style={styles.brandText}>Brand</Text>
            <Text style={styles.matchText}>Match</Text>
          </View>

          {/* SOBRE CON CORAZÓN */}
          <Animated.Text
            style={[
              styles.emoji,
              { transform: [{ scale: heartbeatAnim }] },
            ]}
          >
            💌
          </Animated.Text>
        </Animated.View>

        {/* DESCRIPCIÓN */}
        <Animated.View
          style={[
            styles.subtitleContainer,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.subtitle}>
            El "Tinder" de Marcas
          </Text>

          <Text style={styles.subtitle}>
            e Influencers.
          </Text>
        </Animated.View>

        {/* BOTÓN START */}
        <Animated.View
          style={[
            styles.buttonContainer,
            { opacity: fadeAnim },
          ]}
        >
          <Animated.View style={styles.buttonWrapper}>
            <Text
              style={styles.buttonText}
              onPress={() => navigation.replace('Login')}
              accessibilityRole="button"
            >
              Start
            </Text>
          </Animated.View>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 65,
  },

  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  brandText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#91B5C8',
    letterSpacing: -2,
  },

  matchText: {
    fontSize: 42,
    fontWeight: '800',
    color: '#D77D9D',
    letterSpacing: -2,
  },

  emoji: {
    fontSize: 38,
    marginTop: 18,
  },

  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 125,
  },

  subtitle: {
    fontSize: 19,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 34,
    fontWeight: '400',
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },

  buttonWrapper: {
    width: '100%',
    height: 64,
    backgroundColor: '#FF4B50',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    paddingVertical: 17,
  },
});
