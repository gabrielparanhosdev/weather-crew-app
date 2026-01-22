import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import ModalScreen from '../screens/ModalScreen';
import TabNavigator from './TabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ presentation: 'modal', title: 'Modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
