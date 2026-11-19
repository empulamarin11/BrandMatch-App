import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import { requestPasswordReset } from '../../container';
import { ValidationError } from '../../domain/auth/AuthErrors';

export default function ForgotPasswordScreen({ navigation, route }) {
  const { height } = useWindowDimensions();
  const compact = height < 520; // 16:9 horizontal o 1:1 compacto
  const styles = useMemo(() => createStyles(compact), [compact]);

  const [email, setEmail] = useState(route?.params?.email ?? '');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      await requestPasswordReset({ email });
      Alert.alert('Password recovery', 'Check your inbox for the reset link.');
    } catch (err) {
      if (err instanceof ValidationError) {
        setError(err.fieldErrors.email);
      } else {
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter your email to receive a password reset link
            </Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, error && styles.inputError]}
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <Text style={styles.primaryButtonText}>Send reset link</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={8}
              style={({ pressed }) => [styles.backWrapper, pressed && styles.pressedLight]}
              accessibilityRole="link"
            >
              <Text style={styles.link}>Back to Login</Text>
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
    label: { fontSize: 13, fontWeight: '600', color: '#FFFFFF', marginBottom: compact ? 4 : 8 },
    input: {
      height: CONTROL_HEIGHT,
      backgroundColor: COLORS.inputBackground,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
      paddingHorizontal: 14,
      color: '#FFFFFF',
      fontSize: 14,
    },
    inputError: { borderColor: COLORS.error },
    errorText: { color: COLORS.error, fontSize: 12, marginTop: compact ? 3 : 6 },
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
    pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
    pressedLight: { opacity: 0.6 },
  });
};