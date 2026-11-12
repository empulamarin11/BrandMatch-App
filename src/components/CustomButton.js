import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme/colors';

export default function CustomButton({ title, onPress, variant = 'primary' }) {
  const backgroundColor = variant === 'action' ? COLORS.action : COLORS.primary;
  const textColor = variant === 'action' ? COLORS.textLight : COLORS.background;

  // Creamos la animación para el botón
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Se encoge un 5%
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Vuelve a su tamaño normal
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut}
      activeOpacity={1} // Quitamos el efecto por defecto para usar el nuestro
    >
      <Animated.View style={[styles.button, { backgroundColor, transform: [{ scale: scaleValue }] }]}>
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});