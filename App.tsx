import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './src/navigations/HomeStack';
import { GradientProvider } from './src/context/GradientContext';

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <GradientProvider>{children}</GradientProvider>
);

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
        {/* <BgScreen /> */}
        <HomeStack />
      </NavigationContainer>
    </AppState>
  );
};

export default App;
