/**
 * @format
 */
 import 'react-native';
 import React from 'react'; 
 import Inventory from '../src/screens/more/inventory';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
 
 it('renders correctly', () => {
   const inventory = renderer.create(<Inventory />)
   expect(inventory).toMatchSnapshot();
 });
 