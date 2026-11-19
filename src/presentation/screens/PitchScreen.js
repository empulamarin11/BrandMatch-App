import React from 'react';
import { View, StyleSheet, ScrollView, Clipboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperPlaneTilt } from 'phosphor-react-native';
import { AppText } from '../components/atoms/AppText';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/CustomButton';

export default function PitchScreen({ navigation, route}) {
  // Recibimos directamente el influencer elegido en MatchScreen (sin datos quemados)
      const {influencer} = route.params;
  // Armamos el mensaje usando los datos reales del JSON seleccionado
  const mensajePitch = `Hola ${influencer.name},\n\nHe estado siguiendo tu contenido y me encanta tu estilo (${influencer.arquetipo}) y cómo conectas con tu comunidad. Creemos que tu perfil encaja perfectamente con nuestra nueva línea premium.\n\n¿Te parece bien agendar una llamada esta semana?\n\nEl Equipo de Marketing.`;

  const copiarAlPortapapeles = () =>{
    Clipboard.setString(mensajePitch);
    Alert.alert(
        'Mensaje copiado exitosamente',
        `El mensaje para @${influencer.username} ya está en tu portapapeles listo para pegar.`,
        [{ text: 'Aceptar' }]
         );
      };
      return (
  <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headerRow}>
              <PaperPlaneTilt size={28} color={COLORS.primary} weight="bold" />
              <AppText variant="title" style={styles.titleSpacing}>
                  Pitch Generado
              </AppText>
          </View>

          <View style={styles.card}>
              <AppText variant="subtitle" color="primary" style={styles.emailTo}>
                  Para: @{influencer.username}
              </AppText>
              <AppText variant="body" color="textMuted">
                  {mensajePitch}
              </AppText>
          </View>


        <CustomButton
          title="Copiar Mensaje" variant="action"
          onPress={copiarAlPortapapeles}
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
    headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 10 },
    titleSpacing: { fontSize: 28 },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        marginBottom: 20,
    },
    emailTo: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 15,
    },
});