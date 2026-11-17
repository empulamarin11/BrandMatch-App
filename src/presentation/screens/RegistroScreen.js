import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';

export default function RegistroScreen({ navigation }) {
  // --- ESTADOS ---
  const [isSuccess, setIsSuccess] = useState(false); // Estado para el check verde

  // --- ANIMACIONES ---
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim1, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true })
      ]),
      Animated.timing(fadeAnim2, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(fadeAnim3, { toValue: 1, duration: 400, useNativeDriver: true })
    ]).start();
  }, []);

  // --- FUNCIÓN DE ÉXITO ---
  const handleRegistro = () => {
    setIsSuccess(true); // Cambia el botón a verde con el check
    // Espera 1.2 segundos y navega a la siguiente pantalla
    setTimeout(() => {
      navigation.navigate('Configuracion');
    }, 1200); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* Animación 1: Título */}
        <Animated.View style={{ opacity: fadeAnim1, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Únete a la revolución del marketing</Text>
        </Animated.View>

        {/* Animación 2: Formulario */}
        <Animated.View style={[styles.form, { opacity: fadeAnim2 }]}>
          <TextInput 
            style={styles.input} 
            placeholder="Nombre completo" 
            placeholderTextColor={COLORS.textMuted}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Correo Electrónico" 
            placeholderTextColor={COLORS.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            placeholderTextColor={COLORS.textMuted}
            secureTextEntry
          />
        </Animated.View>

        {/* Animación 3: Botones */}
        <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim3 }]}>
          
          {/* EL BOTÓN MÁGICO CON EFECTO DE ÉXITO */}
          <CustomButton 
            title={isSuccess ? "✓ ¡Cuenta Creada!" : "Crear Cuenta"} 
            variant={isSuccess ? "primary" : "action"} // Cambia a cian si tiene éxito
            onPress={handleRegistro} 
          />
          
          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>o regístrate con</Text>
            <View style={styles.line} />
          </View>

          {/* Botones de redes sociales (en fila) */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => navigation.navigate('Configuracion')}>
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => navigation.navigate('Configuracion')}>
              <Text style={styles.socialText}>TikTok</Text>
            </TouchableOpacity>
          </View>

          {/* Volver al Login */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
            <Text style={styles.backText}>¿Ya tienes cuenta? Inicia Sesión</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { fontSize: 38, fontWeight: '900', color: COLORS.primary, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: COLORS.textMuted, textAlign: 'center', marginBottom: 40 },
  form: { marginBottom: 20 },
  input: { backgroundColor: COLORS.card, color: COLORS.textLight, height: 48, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  buttonContainer: { marginTop: 10 },
  
  separator: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  separatorText: { color: COLORS.textMuted, paddingHorizontal: 10, fontSize: 14 },
  
  /* Estilos para los botones de Google y TikTok */
  socialButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  socialBtn: { 
    flex: 1, 
    backgroundColor: COLORS.card, 
    height: 48, 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  socialText: { color: COLORS.textLight, fontWeight: 'bold', fontSize: 16 },
  
  backButton: { marginTop: 30, alignItems: 'center' },
  backText: { color: COLORS.textMuted, fontSize: 14 }
});