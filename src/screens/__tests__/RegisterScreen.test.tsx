import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../RegisterScreen';

// Mock do AuthContext
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    register: jest.fn(),
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),
}));

describe('RegisterScreen', () => {
  it('deve renderizar corretamente', () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <RegisterScreen />
      </NavigationContainer>
    );

    expect(getByText('Criar conta')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByPlaceholderText('Confirmar senha')).toBeTruthy();
    expect(getByText('Cadastrar')).toBeTruthy();
  });
});
