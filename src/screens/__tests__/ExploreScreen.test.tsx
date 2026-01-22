import React from 'react';
import { render } from '@testing-library/react-native';
import ExploreScreen from '../ExploreScreen';

// Mock dos componentes que dependem de expo
jest.mock('expo-image', () => ({
  Image: 'Image',
}));

jest.mock('@/components/parallax-scroll-view', () => {
  const React = require('react');
  const { View } = require('react-native');
  return function ParallaxScrollView({ children }: { children: React.ReactNode }) {
    return <View testID="parallax-scroll-view">{children}</View>;
  };
});

describe('ExploreScreen', () => {
  it('deve renderizar corretamente', () => {
    const { getByText } = render(<ExploreScreen />);

    expect(getByText('Explore')).toBeTruthy();
    expect(getByText('This app includes example code to help you get started.')).toBeTruthy();
  });
});
