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
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { AppleIcon, GoogleIcon, EyeIcon, EyeOffIcon } from '../components/AuthIcons';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Punto de integración de la autenticación.
// Todavía no existe backend: aquí no se valida ninguna credencial ni se
// muestra ningún mensaje de éxito. Cuando exista el servicio real, sustituir
// el cuerpo por la llamada (p. ej. `await api.login(email, password)`) y
// lanzar un Error con el mensaje adecuado si las credenciales no son válidas.
async function signIn(_email, _password) {
  return;
}

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Password is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    if (isLoading || !validate()) return;

    setIsLoading(true);
    try {
      await signIn(email.trim(), password);
      // Flujo existente de la app: tras iniciar sesión se pasa a Configuración.
      navigation.navigate('Configuracion');
    } catch (error) {
      setErrors({ form: error?.message || 'Unable to log in. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Login social: no hay integración OAuth configurada en el proyecto.
  // No se simula ningún acceso; se informa al usuario.
  const handleSocialLogin = (provider) => {
    Alert.alert(
      `${provider} login`,
      `${provider} sign-in is not configured yet.`,
    );
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (errors.email || errors.form) setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (errors.password || errors.form) setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
            {/* 1-2. Encabezado */}
            <Text style={styles.title}>BrandMatch</Text>
            <Text style={styles.subtitle}>Access your analytics workspace</Text>

            {/* 3-4. Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={email}
              onChangeText={handleEmailChange}
              placeholder="Email"
              placeholderTextColor={COLORS.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              editable={!isLoading}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            {/* 5-6. Password */}
            <Text style={[styles.label, styles.labelSpacing]}>Password</Text>
            <View style={[styles.input, styles.passwordWrapper, errors.password && styles.inputError]}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={handlePasswordChange}
                placeholder="Password"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry={isPasswordHidden}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                editable={!isLoading}
              />
              <Pressable
                onPress={() => setIsPasswordHidden((hidden) => !hidden)}
                hitSlop={10}
                style={({ pressed }) => [styles.eyeButton, pressed && styles.pressedLight]}
                accessibilityRole="button"
                accessibilityLabel={isPasswordHidden ? 'Show password' : 'Hide password'}
              >
                {isPasswordHidden ? <EyeOffIcon /> : <EyeIcon />}
              </Pressable>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            {/* 7. Forgot Password */}
            <Pressable
              onPress={() => navigation.navigate('RecuperarPassword', { email: email.trim() })}
              hitSlop={8}
              style={({ pressed }) => [styles.forgotWrapper, pressed && styles.pressedLight]}
              accessibilityRole="link"
            >
              <Text style={styles.link}>Forgot Password</Text>
            </Pressable>

            {errors.form ? <Text style={[styles.errorText, styles.formError]}>{errors.form}</Text> : null}

            {/* 8. Botón Login */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityState={{ busy: isLoading, disabled: isLoading }}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Login</Text>
              )}
            </Pressable>

            {/* 9. Separador */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or login with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* 10. Apple / Google */}
            <View style={styles.socialRow}>
              <Pressable
                onPress={() => handleSocialLogin('Apple')}
                style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel="Login with Apple"
              >
                <View style={styles.socialIcon}>
                  <AppleIcon size={26} />
                </View>
                <Text style={styles.socialText}>Apple</Text>
              </Pressable>

              <View style={styles.socialGap} />

              <Pressable
                onPress={() => handleSocialLogin('Google')}
                style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}
                accessibilityRole="button"
                accessibilityLabel="Login with Google"
              >
                <View style={styles.socialIcon}>
                  <GoogleIcon size={26} />
                </View>
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
            </View>

            {/* 11. Register */}
            <View style={styles.registerRow}>
              <Text style={styles.registerText}>Don’t have account? </Text>
              <Pressable
                onPress={() => navigation.navigate('Registro')}
                hitSlop={8}
                style={({ pressed }) => pressed && styles.pressedLight}
                accessibilityRole="link"
              >
                <Text style={[styles.link, styles.registerLink]}>Register</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  // Formulario anclado arriba; el espacio libre queda debajo, como en la referencia.
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

  forgotWrapper: { alignSelf: 'flex-end', marginTop: 12 },
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
    marginTop: 22,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.divider,
  },
  dividerText: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginHorizontal: 12,
  },

  socialRow: { flexDirection: 'row' },
  socialGap: { width: 12 },
  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: RADIUS,
    backgroundColor: COLORS.authButton,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: { marginRight: 10 },
  socialText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 22,
  },
  registerText: { color: COLORS.textMuted, fontSize: 14 },
  registerLink: { fontWeight: '700' },

  // Retroalimentación visual al presionar
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  pressedLight: { opacity: 0.6 },
});
