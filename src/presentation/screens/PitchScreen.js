import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';

export default function PitchScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Pitch Generado</Text>
        
        <View style={styles.card}>
          <Text style={styles.emailTo}>Para: @alex_acoustic</Text>
          <Text style={styles.emailBody}>
            Hola Alex,{"\n\n"}
            He estado siguiendo tu contenido y me encanta cómo conectas con tu comunidad. Creemos que tu estilo encaja perfectamente con nuestra nueva línea premium.{"\n\n"}
            ¿Te parece bien agendar una llamada esta semana?{"\n\n"}
            El Equipo de Marketing.
          </Text>
        </View>

        <CustomButton 
          title="Copiar Mensaje" variant="action" 
          onPress={() => navigation.navigate('Login')} 
        />

        <CustomButton 
          title="Cerrar Sesión" variant="action" 
          onPress={() => navigation.navigate('Welcome')} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 24, paddingTop: 40 },
  title: { fontSize: 32, fontWeight: '900', color: COLORS.textLight, marginBottom: 20 },
  card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 20 },
  emailTo: { color: COLORS.primary, fontSize: 14, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 15 },
  emailBody: { color: COLORS.textMuted, fontSize: 15, lineHeight: 22 }
});