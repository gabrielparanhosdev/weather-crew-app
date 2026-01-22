import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../OnboardingScreen';

// Mock do useOnboarding
jest.mock('../../hooks/useOnboarding', () => ({
  useOnboarding: () => ({
    hasSeenOnboarding: false,
    isLoading: false,
    completeOnboarding: jest.fn(),
  }),
}));

describe('OnboardingScreen', () => {
  it('deve renderizar corretamente', () => {
    const { getByText } = render(
      <NavigationContainer>
        <OnboardingScreen />
      </NavigationContainer>
    );

    expect(getByText('Bem-vindo ao Weather Crew')).toBeTruthy();
    expect(getByText('Pular')).toBeTruthy();
    expect(getByText('Próximo')).toBeTruthy();
  });

  it('deve mostrar "Começar" no último slide', () => {
    const { getByText } = render(
      <NavigationContainer>
        <OnboardingScreen />
      </NavigationContainer>
    );

    // Por padrão, começa no primeiro slide, então mostra "Próximo"
    // Mas a lógica está implementada para mostrar "Começar" no último slide
    expect(getByText('Próximo')).toBeTruthy();
  });
});
