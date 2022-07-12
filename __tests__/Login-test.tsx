 import 'react-native';
 import React from 'react';
 import Login from '../src/screens/onboarding/login';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 
 it('renders correctly', () => {
   const login = renderer.create(<Login />);
   expect(login).toMatchSnapshot();
 })
 