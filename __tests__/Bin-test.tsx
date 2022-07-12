import 'react-native';
import React from 'react';
import Trash from '../src/screens/more/trash';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const bin = renderer.create(<Trash />)
  expect(bin).toMatchSnapshot();
});
