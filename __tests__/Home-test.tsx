/**
 * @format
 */
 import 'react-native';
 import React from 'react';
 import Home from '../src/screens/home'; 
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 jest.mock('@react-navigation/native', () => ({
    useIsFocused: jest.fn(),
  }));
 
 it('renders correctly', () => {
   const home = renderer.create(<Home />)
   expect(home).toMatchSnapshot();
 });
 