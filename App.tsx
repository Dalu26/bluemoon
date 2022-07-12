import React from 'react';
import { UserProvider } from './src/context/providers/UserContext';
import { ProductProvider } from './src/context/providers/ProductContext';
import AppNavigator from './src/navigation/AppNavigation';

const App = () => {

  return (
    <UserProvider>
      <ProductProvider>
        <AppNavigator />
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
