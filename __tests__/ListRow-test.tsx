import 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ListRow from '../src/components/products/ListRow';


 describe('Testing card component', () => {
    test('clicking on the card takes you to the edit screen', async () => {
      const component = (
        <NavigationContainer>
            <ListRow />
        </NavigationContainer>
      );
  
      render(component);
      const oldScreen = screen.queryAllByTestId('inventory');
      const card = await screen.findByTestId('list-row');
  
      expect(oldScreen).toBeTruthy();
  
      fireEvent(card, 'press');
      const newScreen = await screen.queryAllByTestId('edit');
  
      expect(newScreen).toBeTruthy();
    });
  });
 