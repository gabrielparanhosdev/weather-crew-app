import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from '../AuthNavigator';

describe('AuthNavigator', () => {
  it('deve renderizar o navegador de autenticação corretamente', () => {
    const { getByText } = render(
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );

    // Verifica se a tela de login está renderizada (tela inicial)
    expect(getByText('Bem-vindo de volta!')).toBeTruthy();
  });
});
