import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView, // Evita que el teclado tape el formulario
  ScrollView,           // Permite desplazar la pantalla si no cabe
  Platform,             // Saber si es Android o iOS
  ActivityIndicator,    // Circulito de carga
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Line } from 'react-native-svg'; // Para dibujar el ícono del ojo
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';

// Ícono del ojo dibujado con SVG (abierto = contraseña oculta, tachado = contraseña visible)
function EyeIcon({ tachado }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {tachado ? (
        <>
          <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <Line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <Circle cx="12" cy="12" r="3" />
        </>
      )}
    </Svg>
  );
}

export default function RegistroScreen({ navigation }) {
  // --- ESTADOS ---
  const [isSuccess, setIsSuccess] = useState(false);       // Estado para el check de éxito
  const [nombre, setNombre] = useState('');                // Guarda el nombre completo
  const [correo, setCorreo] = useState('');                // Guarda el correo
  const [password, setPassword] = useState('');            // Guarda la contraseña
  const [repetirPassword, setRepetirPassword] = useState(''); // Guarda la contraseña repetida
  const [verPassword, setVerPassword] = useState(false);   // false = contraseña oculta
  const [verRepetir, setVerRepetir] = useState(false);     // false = contraseña repetida oculta
  const [error, setError] = useState('');                  // Mensaje de error
  const [isLoading, setIsLoading] = useState(false);       // true = mostrando el circulito de carga

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

  // --- FUNCIÓN DEL BOTÓN REGISTER ---
  const handleRegistro = () => {
    // Si ya está cargando o ya se creó la cuenta, no hacer nada (evita doble toque)
    if (isLoading || isSuccess) return;

    // Revisar que ningún campo esté vacío
    if (nombre.trim() === '' || correo.trim() === '' || password === '' || repetirPassword === '') {
      setError('Please fill in all fields');
      return; // "return" detiene la función: no se crea la cuenta
    }

    // Revisar que el correo tenga formato válido (algo@algo.algo)
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo.trim())) {
      setError('Please enter a valid email');
      return;
    }

    // Revisar que la contraseña tenga al menos 6 caracteres
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Revisar que las dos contraseñas sean iguales
    if (password !== repetirPassword) {
      setError('Passwords do not match');
      return;
    }

    // Si pasó todas las validaciones, se borra el error
    setError('');

    // Mostrar el circulito de carga durante 1.5 segundos (simula el servidor)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true); // Cambia el botón a "✓ Account Created!"

      // Espera 1.2 segundos y navega a la siguiente pantalla
      setTimeout(() => {
        navigation.navigate('Configuracion');
      }, 1200);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* En iOS se empuja el contenido hacia arriba; en Android se reduce la altura */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled" // Permite tocar botones con el teclado abierto
        >

          {/* Animación 1: Título */}
          <Animated.View style={{ opacity: fadeAnim1, transform: [{ translateY: slideAnim }] }}>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Create your BrandMatch account</Text>
          </Animated.View>

          {/* Animación 2: Formulario (cada campo con su etiqueta encima) */}
          <Animated.View style={{ opacity: fadeAnim2 }}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor={COLORS.textMuted}
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={correo}
              onChangeText={setCorreo}
            />

            {/* Campo Password con su botón de ojo */}
            <Text style={styles.label}>Password</Text>
            <View>
              <TextInput
                style={[styles.input, styles.inputPassword]}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry={!verPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setVerPassword(!verPassword)}>
                <EyeIcon tachado={verPassword} />
              </TouchableOpacity>
            </View>

            {/* Campo Repeat Password con su propio botón de ojo */}
            <Text style={styles.label}>Repeat Password</Text>
            <View>
              <TextInput
                style={[styles.input, styles.inputPassword]}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry={!verRepetir}
                value={repetirPassword}
                onChangeText={setRepetirPassword}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setVerRepetir(!verRepetir)}>
                <EyeIcon tachado={verRepetir} />
              </TouchableOpacity>
            </View>

            {/* Mensaje de error, solo se muestra si "error" tiene texto */}
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
          </Animated.View>

          {/* Animación 3: Botón y pie */}
          <Animated.View style={{ opacity: fadeAnim3 }}>

            {/* Mientras carga se ve el circulito; si no, el botón normal */}
            {isLoading ? (
              <View style={styles.loadingBox}>
                <ActivityIndicator size="small" color={COLORS.textLight} />
              </View>
            ) : (
              <CustomButton
                title={isSuccess ? "✓ Account Created!" : "Register"}
                variant={isSuccess ? "primary" : "action"} // Cambia a cian si tiene éxito
                onPress={handleRegistro}
              />
            )}

            {/* Pie: "I have account? Log in" */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>I have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Log in</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  // flexGrow (en vez de flex) para que el ScrollView centre el contenido y aún pueda desplazarse
  content: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 24, justifyContent: 'center' },

  // Título y subtítulo
  title: { fontSize: 28, fontWeight: '800', color: COLORS.textLight, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textMuted, textAlign: 'center', marginBottom: 32 },

  // Etiquetas y campos
  label: { color: COLORS.textLight, fontSize: 13, fontWeight: '600', marginBottom: 8 },
  input: {
    backgroundColor: '#111A2E',
    color: COLORS.textLight,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)'
  },

  // Botón del ojo dentro de los campos de contraseña
  inputPassword: { paddingRight: 50 },
  eyeButton: { position: 'absolute', right: 14, top: 0, height: 48, justifyContent: 'center' },

  // Texto de error
  errorText: { color: COLORS.action, fontSize: 14, textAlign: 'center', marginBottom: 8 },

  // Caja de carga (misma altura que el botón)
  loadingBox: { height: 48, marginVertical: 10, borderRadius: 12, backgroundColor: COLORS.action, justifyContent: 'center', alignItems: 'center' },

  // Pie de página con el enlace "Log in" en cian y subrayado
  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  footerText: { color: COLORS.textMuted, fontSize: 13 },
  linkText: { color: COLORS.primary, fontSize: 13, fontWeight: 'bold', textDecorationLine: 'underline' },
});
