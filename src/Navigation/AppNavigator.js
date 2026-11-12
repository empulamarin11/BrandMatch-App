import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/loginScreen';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';
import MatchScreen from '../screens/MatchScreen';
import PitchScreen from '../screens/PitchScreen';
import RegistroScreen from '../screens/RegistroScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
      <Stack.Screen name="Match" component={MatchScreen} />
      <Stack.Screen name="Pitch" component={PitchScreen} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
    </Stack.Navigator>
  );
}