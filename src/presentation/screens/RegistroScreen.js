import React, { useState, useMemo } from 'react';
import { AppText } from '../components/atoms/AppText';
import {
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { EyeIcon, EyeOffIcon } from '../components/atoms/AuthIcons';
import { registerUser } from '../../container';
import { ValidationError } from '../../domain/auth/AuthErrors';

export default function RegistroScreen({ navigation }) {
  const { height } = useWindowDimensions();
  const compact = height < 520; // 16:9 horizontal o 1:1 compacto
  const styles = useMemo(() => createStyles(compact), [compact]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isRepeatHidden, setIsRepeatHidden] = useState(true);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    if (isLoading || isSuccess) return;

    setErrors({});
    setIsLoading(true);
    try {
      await registerUser({ fullName, email, password, repeatPassword });

      setIsSuccess(true);
      setTimeout(() => navigation.navigate('Configuracion'), 1200);
    } catch (error) {
      if (error instanceof ValidationError) {
        setErrors(error.fieldErrors);
      } else {
        setErrors({ form: error?.message || 'Unable to create the account. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field) => {
    if (errors[field] || errors.form) {
      setErrors((prev) => ({ ...prev, [field]: undefined, form: undefined }));
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
            <AppText variant="title" color="#FFFFFF" style={styles.title}>
              Registration
            </AppText>
            <AppText variant="body" color="textMuted" style={styles.subtitle}>
              Create your BrandMatch account
            </AppText>
            {/* Full Name */}
            <AppText variant="caption" color="#FFFFFF" style={styles.label}>
              Full Name
            </AppText>


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
            {errors.fullName ?(
                <AppText variant="caption" color="error" style={styles.errorText}>
                  {errors.fullName}
                </AppText>
              ) : null}

            {/* Email */}
            <AppText variant="caption" color="#FFFFFF" style={[styles.label, styles.labelSpacing]}>
              Email
            </AppText>
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
            {errors.email ? (
                <AppText variant="caption" color="error" style={styles.errorText}>
                  {errors.email}
                </AppText>
              ) : null}

            {/* Password */}
            <AppText variant="caption" color="#FFFFFF" style={[styles.label, styles.labelSpacing]}>
              Password
            </AppText>
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
            {errors.password ?(
                <AppText variant="caption" color="error" style={styles.errorText}>
                  {errors.password}
                </AppText>
              ) : null}
            {/* Repeat Password */}
            <AppText variant="caption" color="#FFFFFF" style={[styles.label, styles.labelSpacing]}>
              Repeat Password
            </AppText>
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
            {errors.repeatPassword ? (
                    <AppText variant="caption" color="error" style={styles.errorText}>
                      {errors.repeatPassword}
                    </AppText>
            ) : null}

            {errors.form ? (
                <AppText variant="caption" color="error" style={[styles.errorText, styles.formError]}>
                  {errors.form}
                </AppText>
            ) : null}
            {/* Botón Register */}
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
              ) : isSuccess ? (
                  <View style={styles.successRow}>
                    <CheckCircle size={20} color={COLORS.background} weight="bold" />
                    <AppText variant="subtitle" color="background" style={styles.primaryButtonText}>
                      Account Created!
                    </AppText>
                  </View>
              ) : (
                  <AppText variant="subtitle" color="#FFFFFF" style={styles.primaryButtonText}>
                    Register
                  </AppText>
              )}
            </Pressable>

            {/* I have account? Log in */}
            <View style={styles.loginRow}>
              <AppText variant="body" color="textMuted" style={styles.loginText}>
                I have account?{' '}
              </AppText>
              <Pressable
                onPress={() => navigation.navigate('Login')}
                hitSlop={8}
                style={({ pressed }) => pressed && styles.pressedLight}
                accessibilityRole="link"
              >
                <AppText variant="subtitle" color="accent" style={styles.link}>
                  Log in
                </AppText>
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

    link: { fontSize: 14, color: COLORS.accent, textDecorationLine: 'underline' },

    primaryButton: {
      height: CONTROL_HEIGHT,
      borderRadius: RADIUS,
      backgroundColor: COLORS.authButton,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: compact ? 14 : 28,
    },
    primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
    successButton: { backgroundColor: COLORS.primary },
    successButtonText: { color: COLORS.background },

    loginRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: compact ? 12 : 22,
    },
    loginText: { color: COLORS.textMuted, fontSize: 14 },
    loginLink: { fontWeight: '700' },

    pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
    pressedLight: { opacity: 0.6 },
  });
};