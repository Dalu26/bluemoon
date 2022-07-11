import React from 'react';
import { AppContextProvider } from './src/context/providers/AppContextProvider';
import AppNavigator from './src/navigation/AppNavigation';

const App = () => {

  return (
    <AppContextProvider>
      <AppNavigator />
    </AppContextProvider>
  );
};

export default App;
