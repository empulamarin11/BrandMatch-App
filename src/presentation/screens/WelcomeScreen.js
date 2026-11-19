import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const isCompactHeight = height < 520; // Se activa en 16:9 horizontal o 1:1 compacto

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;
  const heartbeatAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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
      <StatusBar barStyle="light-content" backgroundColor="#0B0F19" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* LOGOTIPO */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                marginBottom: isCompactHeight ? 20 : 55,
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.logoRow}>
              <Text style={styles.brandText}>Brand</Text>
              <Text style={styles.matchText}>Match</Text>
            </View>

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
              {
                marginBottom: isCompactHeight ? 28 : 95,
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.subtitle}>El "Tinder" de Marcas</Text>
            <Text style={styles.subtitle}>e Influencers.</Text>
          </Animated.View>

          {/* BOTÓN START */}
          <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F19',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logoContainer: {
    alignItems: 'center',
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
    marginTop: 14,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 19,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: '400',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: 380,
    height: 60,
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
    paddingVertical: 15,
  },
});