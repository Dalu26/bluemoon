import 'react-native';
import React from 'react';
import Edit from '../src/screens/more/edit';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const testProps = (props: Object) => ({
  navigation: {
    state: {params: {}},
    dispatch: jest.fn(),
    goBack: jest.fn(),
    dismiss: jest.fn(),
    navigate: jest.fn(),
    openDrawer: jest.fn(),
    closeDrawer: jest.fn(),
    toggleDrawer: jest.fn(),
    getParam: jest.fn(),
    setParams: jest.fn(),
    addListener: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    isFocused: jest.fn(),
  },
  route: {
    params: {item: null},
  },
  ...props,
});
let props = testProps({});

it('renders correctly', () => {
  const edit= renderer.create(<Edit {...props} />)
  expect(edit).toMatchSnapshot();
});
