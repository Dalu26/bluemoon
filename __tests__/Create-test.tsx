import 'react-native';
import React from 'react';
import CreateProduct from '../src/screens/more/createProduct';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const create = renderer.create(<CreateProduct />)
  expect(create).toMatchSnapshot();
});
