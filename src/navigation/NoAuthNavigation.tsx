import auth from '@react-native-firebase/auth';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from '../screens/Signin/Signin';
import MainNavigation from './MainNavigation';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

type NoAuthParamList = {
  Signin: undefined;
  Main: undefined;
};

export type NoAuthNavigationProps = NativeStackNavigationProp<NoAuthParamList>;

const NoAuth = createStackNavigator();

const NoAuthNavigation = () => {
  return (
    <NoAuth.Navigator
      initialRouteName={auth().currentUser ? 'Main' : 'Signin'}
      screenOptions={{
        headerShown: false,
      }}>
      <NoAuth.Screen name="Signin" component={Signin} />
      <NoAuth.Screen name="Main" component={MainNavigation} />
    </NoAuth.Navigator>
  );
};

export default NoAuthNavigation;
