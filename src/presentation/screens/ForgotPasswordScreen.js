import React, { useState, useMemo } from 'react';
import {
  View,
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
import AppText from '../components/atoms/AppText';
import CustomButton from '../components/atoms/CustomButton';
import FormField from '../components/molecules/FormField';

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