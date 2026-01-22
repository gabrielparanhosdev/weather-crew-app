import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useOnboarding } from '../hooks/useOnboarding';
import GuestHomeScreen from '../screens/GuestHomeScreen';
import LoginScreen from '../screens/LoginScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  const { hasSeenOnboarding, isLoading } = useOnboarding();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={hasSeenOnboarding ? 'Login' : 'Onboarding'}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="GuestHome" component={GuestHomeScreen} />
    </Stack.Navigator>
  );
}
