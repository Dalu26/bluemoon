 import 'react-native';
 import React from 'react';
 import More from '../src/screens/more';
 
 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';
 
 it('renders correctly', () => {
   const more = renderer.create(<More />)
   expect(more).toMatchSnapshot();
 });
 