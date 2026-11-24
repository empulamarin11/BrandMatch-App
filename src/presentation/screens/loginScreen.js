import React, { useState, useMemo } from 'react';
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
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { AppleIcon, GoogleIcon, EyeIcon, EyeOffIcon } from '../components/atoms/AuthIcons';
import { loginUser } from '../../container';
import { ValidationError } from '../../domain/auth/AuthErrors';

export default function LoginScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const compact = height < 520; // 16:9 horizontal o 1:1 compacto
  const styles = useMemo(() => createStyles(compact), [compact]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;

    setErrors({});
    setIsLoading(true);
    try {
      await loginUser({ email, password });
      navigation.navigate('Configuracion');
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error.fieldErrors);
      } else {
        setErrors({ form: error?.message || 'Unable to log in. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    Alert.alert(`${provider} login`, `${provider} sign-in is not configured yet.`);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (errors.email || errors.form) {
      setErrors((prev) => ({ ...prev, email: undefined, form: undefined }));
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (errors.password || errors.form) {
      setErrors((prev) => ({ ...prev, password: undefined, form: undefined }));
    }
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
            <Text style={styles.title}>BrandMatch</Text>
            <Text style={styles.subtitle}>Access your analytics workspace</Text>

            {/* Email */}
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

            {/* Password */}
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

            {/* Forgot Password */}
            <Pressable
              onPress={() => navigation.navigate('RecuperarPassword', { email: email.trim() })}
              hitSlop={8}
              style={({ pressed }) => [styles.forgotWrapper, pressed && styles.pressedLight]}
              accessibilityRole="link"
            >
              <Text style={styles.link}>Forgot Password</Text>
            </Pressable>

            {errors.form ? <Text style={[styles.errorText, styles.formError]}>{errors.form}</Text> : null}

            {/* Botón Login */}
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

            {/* Separador */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or login with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Apple / Google */}
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

            {/* Register */}
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

const createStyles = (compact) => {
  const CONTROL_HEIGHT = compact ? 42 : 50;

  return StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    flex: { flex: 1 },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: compact ? 12 : 24,
    },
    content: { width: '100%', maxWidth: 480, alignSelf: 'center' },

    title: {
      fontSize: compact ? 22 : 28,
      fontWeight: '800',
      color: '#FFFFFF',
      textAlign: 'center',
      letterSpacing: -0.5,
    },
    subtitle: {
      fontSize: compact ? 13 : 14,
      color: COLORS.textMuted,
      textAlign: 'center',
      marginTop: compact ? 4 : 10,
      marginBottom: compact ? 14 : 30,
    },

    label: {
      fontSize: 13,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: compact ? 4 : 8,
    },
    labelSpacing: { marginTop: compact ? 10 : 22 },

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
    passwordWrapper: { flexDirection: 'row', alignItems: 'center', paddingRight: 10 },
    passwordInput: {
      flex: 1,
      height: '100%',
      color: '#FFFFFF',
      fontSize: 14,
      paddingVertical: 0,
    },
    eyeButton: { padding: 4, marginLeft: 8 },

    errorText: { color: COLORS.error, fontSize: 12, marginTop: compact ? 3 : 6 },
    formError: { textAlign: 'center', marginTop: compact ? 8 : 12 },

    forgotWrapper: { alignSelf: 'flex-end', marginTop: compact ? 8 : 12 },
    link: { fontSize: 14, color: COLORS.accent, textDecorationLine: 'underline' },

    primaryButton: {
      height: CONTROL_HEIGHT,
      borderRadius: RADIUS,
      backgroundColor: COLORS.authButton,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: compact ? 14 : 22,
    },
    primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },

    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: compact ? 10 : 18,
      marginBottom: compact ? 10 : 16,
    },
    dividerLine: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: COLORS.divider },
    dividerText: { color: COLORS.textMuted, fontSize: 14, marginHorizontal: 12 },

    socialRow: { flexDirection: 'row' },
    socialGap: { width: 12 },
    socialButton: {
      flex: 1,
      height: compact ? 44 : 52,
      borderRadius: RADIUS,
      backgroundColor: COLORS.authButton,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.08)',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    socialIcon: { marginRight: 10 },
    socialText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },

    registerRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: compact ? 12 : 22,
    },
    registerText: { color: COLORS.textMuted, fontSize: 14 },
    registerLink: { fontWeight: '700' },

    pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
    pressedLight: { opacity: 0.6 },
  });
};