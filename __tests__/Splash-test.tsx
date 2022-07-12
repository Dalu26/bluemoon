 import 'react-native';
 import React from 'react';
 import SplashScreen from '../src/screens/onboarding/splashscreen';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
//  jest.useFakeTimers()
 
 it('renders correctly', () => {
   const splash = renderer.create(<SplashScreen />)
   expect(splash).toMatchSnapshot();
 });
 