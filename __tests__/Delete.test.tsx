import 'react-native';
import React from 'react';
import Edit from '../src/screens/more/edit';
import AlertModal, {  } from '../src/components/general/AlertModal';
import {fireEvent, render} from '@testing-library/react-native';
const spy = jest.spyOn(AlertModal, 'erase');

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
    params: {itemId: null},
  },
  ...props,
});


const initialState = {
  name: '',
  price: '',
  totalStock: '',
  description: '',
};

let props = testProps({});

test('test to ensure the confirmation pop up is shown when trying to delete an existing items', async () => {
  React.useState = jest.fn().mockReturnValue([initialState, {}]);
  React.useEffect = jest.fn();
  const { getByTestId } = render(<Edit {...props} />);
  const fab = getByTestId('delete-item');
  fireEvent.press(fab);
    expect(AlertModal?.defaultProps?.deleteItem).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
});