import React from 'react';
import { Text } from 'react-native';
import { COLORS } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';

export const AppText = ({
                            children,
                            variant = 'body',
                            color = 'textLight',
                            style,
                            ...props
                        }) => {
    // 1. Busca el estilo de letra (title, subtitle, body o caption) en typography.js
    const variantStyle = TYPOGRAPHY.variants[variant] || TYPOGRAPHY.variants.body;

    // 2. Busca el color en colors.js (si no existe ahí, acepta un código hex directo)
    const textColor = COLORS[color] || color;

    return (
        <Text style={[variantStyle, { color: textColor }, style]} {...props}>
            {children}
        </Text>
    );
};