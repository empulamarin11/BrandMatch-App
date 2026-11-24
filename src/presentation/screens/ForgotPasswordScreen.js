import React, { useState } from 'react';
import {
  View,
<<<<<<< HEAD
  TextInput,
=======
>>>>>>> 92b62ff80c8a0b134b4894be6d974f9d136ca5e7
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LockKey, EnvelopeSimple, PaperPlaneTilt, ArrowLeft } from 'phosphor-react-native';
import { AppText } from '../components/atoms/AppText';
import { COLORS } from '../theme/colors';
import { TYPOGRAPHY } from '../theme/typography';
import { requestPasswordReset } from '../../container';
import { ValidationError } from '../../domain/auth/AuthErrors';
import { AppText } from '../components/atoms/AppText';
import CustomButton from '../components/atoms/CustomButton';
import FormField from '../components/molecules/FormField';

export default function ForgotPasswordScreen({ navigation, route }) {
  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [error, setError] = useState('');

  // La validación y el envío los hace el caso de uso
  // (application/auth/requestPasswordReset.js).
  const handleSubmit = async () => {
    setError('');
    try {
      await requestPasswordReset({ email });
      Alert.alert('Password recovery', 'Check your inbox for the reset link.');
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.fieldErrors.email);
      } else {
        // Hoy el backend no existe: AuthApi lanza NotConfiguredError con un mensaje claro.
        Alert.alert('Password recovery', err?.message || 'Something went wrong. Please try again.');
      }
    }
  };

  return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
<<<<<<< HEAD
          <View style={styles.content}>
            {/* Ícono Phosphor del encabezado */}
            <View style={styles.iconCircle}>
              <LockKey size={36} color={COLORS.accent} weight="bold" />
            </View>

            <AppText variant="title" color="#FFFFFF" style={styles.title}>
              Forgot Password
            </AppText>
            <AppText variant="body" color="textMuted" style={styles.subtitle}>
              Enter your email to receive a password reset link
            </AppText>

            <AppText variant="caption" color="#FFFFFF" style={styles.label}>
              Email
            </AppText>
            <View style={[styles.input, error && styles.inputError]}>
              <EnvelopeSimple size={20} color={COLORS.textMuted} />
              <TextInput
                style={styles.inputField}
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  if (error) setError('');
                }}
                placeholder="Email"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
              />
            </View>
            {error ? (
              <AppText variant="caption" color="error" style={styles.errorText}>
                {error}
              </AppText>
            ) : null}

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <PaperPlaneTilt size={18} color="#FFFFFF" weight="bold" />
              <AppText variant="subtitle" color="#FFFFFF" style={styles.primaryButtonText}>
                Send reset link
              </AppText>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={8}
              style={({ pressed }) => [styles.backWrapper, pressed && styles.pressedLight]}
              accessibilityRole="link"
            >
              <ArrowLeft size={16} color={COLORS.accent} weight="bold" />
              <AppText variant="body" color="accent" style={styles.link}>
                Back to Login
              </AppText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 },
  content: { width: '100%', maxWidth: 480, alignSelf: 'center' },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  label: { fontSize: 13, marginBottom: 8 },
  input: {
    height: 50,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputField: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: TYPOGRAPHY.family.regular,
  },
  inputError: { borderColor: COLORS.error },
  errorText: { marginTop: 6 },
  primaryButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.authButton,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 22,
  },
  primaryButtonText: { fontSize: 15 },
  backWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    marginTop: 22,
  },
  link: { textDecorationLine: 'underline' },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  pressedLight: { opacity: 0.6 },
});
=======
          <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <AppText style={styles.title}>Forgot Password</AppText>
              <AppText style={styles.subtitle}>
                Enter your email to receive a password reset link
              </AppText>

              <FormField
                  label="Email"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    if (error) setError('');
                  }}
                  placeholder="Email"
                  error={error}
                  compact={compact}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
              />

              <CustomButton
                  title="Send reset link"
                  onPress={handleSubmit}
                  style={styles.primaryButton}
                  textStyle={styles.primaryButtonText}
              />

              <Pressable
                  onPress={() => navigation.goBack()}
                  hitSlop={8}
                  style={({ pressed }) => [styles.backWrapper, pressed && styles.pressedLight]}
                  accessibilityRole="link"
              >
                <AppText style={styles.link}>Back to Login</AppText>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

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
    primaryButton: {
      height: CONTROL_HEIGHT,
      borderRadius: 14,
      backgroundColor: COLORS.authButton,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: compact ? 14 : 22,
    },
    primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
    backWrapper: { alignSelf: 'center', marginTop: compact ? 12 : 22 },
    link: { fontSize: 14, color: COLORS.accent, textDecorationLine: 'underline' },
    pressedLight: { opacity: 0.6 },
  });
};
>>>>>>> 92b62ff80c8a0b134b4894be6d974f9d136ca5e7
