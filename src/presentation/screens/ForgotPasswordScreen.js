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
import { LockKey, EnvelopeSimple, ArrowLeft } from 'phosphor-react-native';
import { COLORS } from '../theme/colors';
import { requestPasswordReset } from '../../container';
import { ValidationError } from '../../domain/auth/AuthErrors';
import { AppText } from '../components/atoms/AppText';
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
            {/* Ícono Phosphor del encabezado */}
            <View style={styles.iconCircle}>
              <LockKey size={compact ? 28 : 36} color={COLORS.accent} weight="bold" />
            </View>

            <AppText variant="title" color="#FFFFFF" style={styles.title}>
              Forgot Password
            </AppText>
            <AppText variant="body" color="textMuted" style={styles.subtitle}>
              Enter your email to receive a password reset link
            </AppText>

            {/* Molécula FormField (Atomic Design) con ícono Phosphor */}
            <FormField
              label="Email"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (error) setError('');
              }}
              placeholder="Email"
              error={error}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              rightElement={<EnvelopeSimple size={20} color={COLORS.textMuted} />}
            />

            {/* Átomo CustomButton (Atomic Design) */}
            <CustomButton title="Send reset link" onPress={handleSubmit} variant="action" />

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

const createStyles = (compact) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    flex: { flex: 1 },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: compact ? 12 : 24,
    },
    content: { width: '100%', maxWidth: 480, alignSelf: 'center' },
    iconCircle: {
      width: compact ? 56 : 72,
      height: compact ? 56 : 72,
      borderRadius: compact ? 28 : 36,
      backgroundColor: COLORS.inputBackground,
      borderWidth: 1,
      borderColor: COLORS.inputBorder,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: compact ? 10 : 18,
    },
    title: {
      fontSize: compact ? 22 : 28,
      lineHeight: compact ? 28 : 34,
      textAlign: 'center',
      letterSpacing: -0.5,
    },
    subtitle: {
      textAlign: 'center',
      marginTop: compact ? 4 : 10,
      marginBottom: compact ? 14 : 30,
    },
    backWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      alignSelf: 'center',
      marginTop: compact ? 12 : 22,
    },
    link: { textDecorationLine: 'underline' },
    pressedLight: { opacity: 0.6 },
  });