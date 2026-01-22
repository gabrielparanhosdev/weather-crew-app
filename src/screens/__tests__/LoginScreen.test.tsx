import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../LoginScreen';

// Mock do AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),
}));

describe('LoginScreen', () => {
  it('deve renderizar corretamente', () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );

    expect(getByText('Bem-vindo de volta!')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });
});
