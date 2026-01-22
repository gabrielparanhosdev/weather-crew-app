import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

// Configurar LogBox ANTES de importar o Reanimated
// Suprimir todos os avisos do Reanimated sobre reduced motion
if (__DEV__) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args[0];
    if (
      typeof message === 'string' &&
      (message.includes('[Reanimated]') || message.includes('Reduced motion'))
    ) {
      return; // Não exibir o warning
    }
    originalWarn.apply(console, args);
  };

  LogBox.ignoreLogs([
    /\[Reanimated\]/,
    /Reduced motion/,
    'Reduced motion setting is enabled',
    'Reduced motion setting is enabled on this device',
  ]);
}

import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    // Hide splash screen after app is ready
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
