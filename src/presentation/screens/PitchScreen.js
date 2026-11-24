import React, { useMemo } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Clipboard,
    Alert,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperPlaneTilt } from 'phosphor-react-native';
import { AppText } from '../components/atoms/AppText';
import { COLORS } from '../theme/colors';
import CustomButton from '../components/atoms/CustomButton';

export default function PitchScreen({ navigation, route }) {
    const { influencer } = route.params;

    const { width, height } = useWindowDimensions();
    const compact = height < 520;
    const row = width > height && width >= 600;
    const styles = useMemo(() => createStyles(compact, row), [compact, row]);

    const mensajePitch = `Hola ${influencer.name},

He estado siguiendo tu contenido y me encanta tu estilo (${influencer.arquetipo}) y cómo conectas con tu comunidad. Creemos que tu perfil encaja perfectamente con nuestra nueva línea premium.

¿Te parece bien agendar una llamada esta semana?

El Equipo de Marketing.`;

    const copiarAlPortapapeles = () => {
        Clipboard.setString(mensajePitch);
        Alert.alert(
            'Mensaje copiado exitosamente',
            `El mensaje para @${influencer.username} ya está en tu portapapeles listo para pegar.`,
            [{ text: 'Aceptar' }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <PaperPlaneTilt size={compact ? 22 : 28} color={COLORS.primary} weight="bold" />
                    <AppText variant="title" style={styles.titleSpacing}>
                        Pitch Generado
                    </AppText>
                </View>

                <View style={styles.body}>
                    <View style={styles.card}>
                        <AppText variant="subtitle" color="primary" style={styles.emailTo}>
                            Para: @{influencer.username}
                        </AppText>
                        <AppText variant="body" color="textMuted" style={styles.emailBody}>
                            {mensajePitch}
                        </AppText>
                    </View>

                    <View style={styles.actions}>
                        <CustomButton title="Copiar Mensaje" variant="action" onPress={copiarAlPortapapeles} />
                        <View style={styles.logoutButton}>
                            <CustomButton
                                title="Cerrar Sesión"
                                variant="action"
                                onPress={() => navigation.navigate('Welcome')}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (compact, row) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: COLORS.background },

        content: {
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: compact ? 16 : 24,
            paddingVertical: compact ? 14 : 40,
            width: '100%',
            maxWidth: row ? 900 : 600,
            alignSelf: 'center',
        },

        headerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: compact ? 10 : 20,
            gap: 10,
        },

        titleSpacing: {
            fontSize: compact ? 22 : 28,
        },

        body: row ? { flexDirection: 'row', alignItems: 'center', gap: 20 } : {},
        actions: row ? { flex: 1 } : {},

        card: {
            flex: row ? 1.6 : undefined,
            backgroundColor: COLORS.card,
            borderRadius: 20,
            padding: compact ? 14 : 20,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            marginBottom: row ? 0 : compact ? 12 : 20,
        },

        emailTo: {
            marginBottom: compact ? 8 : 15,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.1)',
            paddingBottom: compact ? 8 : 15,
        },

        emailBody: {
            fontSize: compact ? 13 : 15,
            lineHeight: compact ? 19 : 22,
        },

        logoutButton: { marginTop: 12 },
    });