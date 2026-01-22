import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ModalScreen from '../ModalScreen';

describe('ModalScreen', () => {
  it('deve renderizar corretamente', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ModalScreen />
      </NavigationContainer>
    );

    expect(getByText('This is a modal')).toBeTruthy();
    expect(getByText('Go to home screen')).toBeTruthy();
  });
});
