import React, { useState, useMemo } from 'react';
import {
  View,
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
import { AppText } from '../components/atoms/AppText';
import FormField from '../components/molecules/FormField';
import { loginUser } from '../../container';
import { ValidationError } from '../../domain/auth/AuthErrors';

export default function LoginScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const compact = height < 520;
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
              <AppText style={styles.title}>BrandMatch</AppText>
              <AppText style={styles.subtitle}>Access your analytics workspace</AppText>

              {/* Email (Molécula FormField) */}
              <FormField
                  label="Email"
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Email"
                  error={errors.email}
                  compact={compact}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  editable={!isLoading}
              />

              {/* Password (Molécula FormField + Átomo EyeIcon) */}
              <View style={styles.labelSpacing}>
                <FormField
                    label="Password"
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder="Password"
                    error={errors.password}
                    compact={compact}
                    secureTextEntry={isPasswordHidden}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    textContentType="password"
                    returnKeyType="done"
                    onSubmitEditing={handleLogin}
                    editable={!isLoading}
                    rightElement={
                      <Pressable
                          onPress={() => setIsPasswordHidden((hidden) => !hidden)}
                          hitSlop={10}
                          style={({ pressed }) => [styles.eyeButton, pressed && styles.pressedLight]}
                          accessibilityRole="button"
                          accessibilityLabel={isPasswordHidden ? 'Show password' : 'Hide password'}
                      >
                        {isPasswordHidden ? <EyeOffIcon /> : <EyeIcon />}
                      </Pressable>
                    }
                />
              </View>

              {/* Forgot Password */}
              <Pressable
                  onPress={() => navigation.navigate('RecuperarPassword', { email: email.trim() })}
                  hitSlop={8}
                  style={({ pressed }) => [styles.forgotWrapper, pressed && styles.pressedLight]}
                  accessibilityRole="link"
              >
                <AppText style={styles.link}>Forgot Password</AppText>
              </Pressable>

              {errors.form ? <AppText style={[styles.errorText, styles.formError]}>{errors.form}</AppText> : null}

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
                    <AppText style={styles.primaryButtonText}>Login</AppText>
                )}
              </Pressable>

              {/* Separador */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <AppText style={styles.dividerText}>Or login with</AppText>
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
                  <AppText style={styles.socialText}>Apple</AppText>
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
                  <AppText style={styles.socialText}>Google</AppText>
                </Pressable>
              </View>

              {/* Register */}
              <View style={styles.registerRow}>
                <AppText style={styles.registerText}>Don’t have account? </AppText>
                <Pressable
                    onPress={() => navigation.navigate('Registro')}
                    hitSlop={8}
                    style={({ pressed }) => pressed && styles.pressedLight}
                    accessibilityRole="link"
                >
                  <AppText style={[styles.link, styles.registerLink]}>Register</AppText>
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
    labelSpacing: { marginTop: compact ? 10 : 22 },
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