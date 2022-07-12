import 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Card from '../src/components/general/Card';


 describe('Testing card component', () => {
    test('clicking on the card takes you to the edit screen', async () => {
      const component = (
        <NavigationContainer>
            <Card />
        </NavigationContainer>
      );
  
      render(component);
      const oldScreen = screen.queryAllByTestId('home');
      const card = await screen.findByTestId('card')
  
      expect(oldScreen).toBeTruthy();
  
      fireEvent(card, 'press');
      const newScreen = await screen.queryAllByTestId('edit');
  
      expect(newScreen).toBeTruthy();
    });
  });
 