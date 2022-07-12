/**
 * @format
 */

import 'react-native';
import React from 'react';
import { UserProvider } from '../src/context/providers/UserContext';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const app = renderer.create(
  <UserProvider />
  );
  expect(app).toMatchSnapshot()
})
