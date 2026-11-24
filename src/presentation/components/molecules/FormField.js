import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AppText from '../atoms/AppText';
import { COLORS } from '../../theme/colors';

export default function FormField({
                                      label,
                                      error,
                                      rightElement,
                                      containerStyle,
                                      inputStyle,
                                      ...inputProps
                                  }) {
    return (
        <View style={[styles.container, containerStyle]}>
            {label ? (
                <AppText variant="label" style={styles.label}>
                    {label}
                </AppText>
            ) : null}

            <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
                <TextInput
                    placeholderTextColor="#94A3B8"
                    style={[styles.input, inputStyle]}
                    {...inputProps}
                />
                {rightElement ? <View style={styles.rightElement}>{rightElement}</View> : null}
            </View>

            {error ? (
                <AppText variant="caption" style={styles.errorText}>
                    {error}
                </AppText>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },
    label: {
        color: '#E2E8F0',
        marginBottom: 6,
        fontSize: 13,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface || '#151C2C',
        borderWidth: 1,
        borderColor: '#263042',
        borderRadius: 12,
        paddingHorizontal: 14,
        minHeight: 48,
    },
    inputError: {
        borderColor: COLORS.primary || '#FE2C55',
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        fontFamily: 'Inter_400Regular',
        fontSize: 15,
        paddingVertical: 10,
    },
    rightElement: {
        marginLeft: 8,
    },
    errorText: {
        color: COLORS.primary || '#FE2C55',
        marginTop: 4,
        fontSize: 12,
    },
});