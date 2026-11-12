import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true); // Muestra el circulito
    setTimeout(() => {
      setIsLoading(false); // Lo oculta
      navigation.navigate('Configuracion'); // Navega
    }, 1500); // 1.5 segundos de "carga"
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Text style={styles.title}>BrandMatch 🤝</Text>
        <Text style={styles.subtitle}>El "Tinder" de Marcas e Influencers.</Text>

        <View style={styles.form}>
          <TextInput 
            style={styles.input} 
            placeholder="Correo Electrónico" 
            placeholderTextColor={COLORS.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            placeholderTextColor={COLORS.textMuted}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          {/* Si isLoading es true, muestra el ActivityIndicator. Si no, muestra el botón */}
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
          ) : (
            <CustomButton 
              title="Iniciar Sesión" 
              variant="action" 
              onPress={handleLogin} 
            />
          )}
          <CustomButton 
            title="Crear una cuenta nueva" 
            variant="primary" 
            onPress={() => navigation.navigate('Registro')} 
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { fontSize: 42, fontWeight: '900', color: COLORS.primary, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: COLORS.textMuted, textAlign: 'center', marginBottom: 40 },
  form: { marginBottom: 20 },
  input: { backgroundColor: COLORS.card, color: COLORS.textLight, height: 48, borderRadius: 12, paddingHorizontal: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  buttonContainer: { marginTop: 10 }
});