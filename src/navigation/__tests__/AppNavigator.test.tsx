import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../AppNavigator';

// Mock dos componentes que dependem de expo
jest.mock('expo-image', () => ({
  Image: 'Image',
}));

jest.mock('@/components/hello-wave', () => ({
  HelloWave: () => null,
}));

jest.mock('@/components/parallax-scroll-view', () => {
  const React = require('react');
  const { View } = require('react-native');
  return function ParallaxScrollView({ children }: { children: React.ReactNode }) {
    return <View testID="parallax-scroll-view">{children}</View>;
  };
});

describe('AppNavigator', () => {
  it('deve renderizar o navegador corretamente', () => {
    const { getByText } = render(<AppNavigator />);

    // Verifica se a tela inicial (Home) está renderizada
    expect(getByText('Welcome!')).toBeTruthy();
  });
});
