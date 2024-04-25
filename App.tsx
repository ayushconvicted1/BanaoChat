import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import NoAuthNavigation from './src/navigation/NoAuthNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{flex: 1}}>
        <NoAuthNavigation />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
