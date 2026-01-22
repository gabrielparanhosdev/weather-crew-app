import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../HomeScreen';

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

describe('HomeScreen', () => {
  it('deve renderizar corretamente', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByText('Welcome!')).toBeTruthy();
    expect(getByText('Step 1: Try it')).toBeTruthy();
  });
});
