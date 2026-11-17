import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { EyeIcon, EyeOffIcon } from '../components/AuthIcons';
import { registerUser } from '../../container';
import { ValidationError } from '../../domain/auth/AuthErrors';

export default function RegistroScreen({ navigation }) {
  // --- ESTADOS: lo que escribe el usuario ---
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // --- ESTADOS: interfaz ---
  const [isPasswordHidden, setIsPasswordHidden] = useState(true); // Ojo del campo Password
  const [isRepeatHidden, setIsRepeatHidden] = useState(true);     // Ojo del campo Repeat Password
  const [errors, setErrors] = useState({});                       // Errores por campo: { email: '...', ... }
  const [isLoading, setIsLoading] = useState(false);              // Circulito de carga
  const [isSuccess, setIsSuccess] = useState(false);              // Botón "✓ Account Created!"

  // La pantalla solo recoge datos y muestra resultados: la validación y el
  // registro los hace el caso de uso (application/auth/registerUser.js).
  const handleRegister = async () => {
    if (isLoading || isSuccess) return; // Evita el doble toque

    setErrors({});
    setIsLoading(true);
    try {
      await registerUser({ fullName, email, password, repeatPassword });

      // Cuenta creada: se muestra el mensaje de éxito y luego se pasa a Configuración.
      setIsSuccess(true);
      setTimeout(() => navigation.navigate('Configuracion'), 1200);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error.fieldErrors); // Muestra el error debajo de cada campo
      } else {
        setErrors({ form: error?.message || 'Unable to create the account. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Al escribir en un campo se borra su error (y el error general del formulario).
  const clearError = (field) => {
    if (errors[field] || errors.form) {
      setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* En iOS se empuja el contenido hacia arriba; en Android se reduce la altura */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Encabezado */}
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Create your BrandMatch account</Text>

            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              value={fullName}
              onChangeText={(value) => { setFullName(value); clearError('fullName'); }}
              placeholder="Full Name"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              returnKeyType="next"
              editable={!isLoading && !isSuccess}
            />
            {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

            {/* Email */}
            <Text style={[styles.label, styles.labelSpacing]}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={(value) => { setEmail(value); clearError('email'); }}
              placeholder="Email"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              editable={!isLoading && !isSuccess}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            {/* Password */}
            <Text style={[styles.label, styles.labelSpacing]}>Password</Text>
            <View style={[styles.input, styles.passwordWrapper, errors.password && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={(value) => { setPassword(value); clearError('password'); }}
                placeholder="Password"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password-new"
                textContentType="newPassword"
                returnKeyType="next"
                editable={!isLoading && !isSuccess}
              />
              <Pressable
                onPress={() => setIsPasswordHidden((hidden) => !hidden)}
                hitSlop={10}
                style={({ pressed }) => [styles.eyeButton, pressed && styles.pressedLight]}
                accessibilityRole="button"
                accessibilityLabel={isPasswordHidden ? 'Show password' : 'Hide password'}
              >
                {isPasswordHidden ? <EyeIcon /> : <EyeOffIcon />}
              </Pressable>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            {/* Repeat Password */}
            <Text style={[styles.label, styles.labelSpacing]}>Repeat Password</Text>
            <View style={[styles.input, styles.passwordWrapper, errors.repeatPassword && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                value={repeatPassword}
                onChangeText={(value) => { setRepeatPassword(value); clearError('repeatPassword'); }}
                placeholder="Repeat Password"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry={isRepeatHidden}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password-new"
                textContentType="newPassword"
                returnKeyType="done"
                onSubmitEditing={handleRegister}
                editable={!isLoading && !isSuccess}
              />
              <Pressable
                onPress={() => setIsRepeatHidden((hidden) => !hidden)}
                hitSlop={10}
                style={({ pressed }) => [styles.eyeButton, pressed && styles.pressedLight]}
                accessibilityRole="button"
                accessibilityLabel={isRepeatHidden ? 'Show password' : 'Hide password'}
              >
                {isRepeatHidden ? <EyeIcon /> : <EyeOffIcon />}
              </Pressable>
            </View>
            {errors.repeatPassword ? <Text style={styles.errorText}>{errors.repeatPassword}</Text> : null}

            {errors.form ? <Text style={[styles.errorText, styles.formError]}>{errors.form}</Text> : null}

            {/* Botón Register: circulito mientras carga, check al terminar */}
            <Pressable
              onPress={handleRegister}
              disabled={isLoading || isSuccess}
              style={({ pressed }) => [
                styles.primaryButton,
                isSuccess && styles.successButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityState={{ busy: isLoading, disabled: isLoading || isSuccess }}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={[styles.primaryButtonText, isSuccess && styles.successButtonText]}>
                  {isSuccess ? '✓ Account Created!' : 'Register'}
                </Text>
              )}
            </Pressable>

            {/* I have account? Log in */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>I have account? </Text>
              <Pressable
                onPress={() => navigation.navigate('Login')}
                hitSlop={8}
                style={({ pressed }) => pressed && styles.pressedLight}
                accessibilityRole="link"
              >
                <Text style={[styles.link, styles.loginLink]}>Log in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Mismas medidas que el Login para que las pantallas de autenticación se vean iguales.
const RADIUS = 14;
const CONTROL_HEIGHT = 50;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  // Formulario anclado arriba, como en el diseño.
  content: { width: '100%', maxWidth: 480, alignSelf: 'center' },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  labelSpacing: { marginTop: 22 },

  input: {
    height: CONTROL_HEIGHT,
    backgroundColor: COLORS.inputBackground,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 14,
  },
  inputError: { borderColor: COLORS.error },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 0,
  },
  eyeButton: { padding: 4, marginLeft: 8 },

  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
  },
  formError: { textAlign: 'center', marginTop: 12 },

  link: {
    fontSize: 14,
    color: COLORS.accent,
    textDecorationLine: 'underline',
  },

  primaryButton: {
    height: CONTROL_HEIGHT,
    borderRadius: RADIUS,
    backgroundColor: COLORS.authButton,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  successButton: { backgroundColor: COLORS.primary },
  successButtonText: { color: COLORS.background },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 22,
  },
  loginText: { color: COLORS.textMuted, fontSize: 14 },
  loginLink: { fontWeight: '700' },

  // Retroalimentación visual al presionar
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  pressedLight: { opacity: 0.6 },
});
