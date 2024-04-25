import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import Chat from '../screens/Chat/Chat';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NoAuthNavigationProps} from './NoAuthNavigation';
import {IUsers} from '../Constants/Users';

type MainParamList = {
  Home: undefined;
  Chat: {
    chat: IUsers;
  };
};

export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<MainParamList>;

const Main = createStackNavigator();

const MainNavigation = () => {
  const navigation = useNavigation<NoAuthNavigationProps>();
  return (
    <Main.Navigator>
      <Main.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={async () => {
                try {
                  await auth().signOut();
                  navigation.navigate('Signin');
                } catch (error) {
                  ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
                }
              }}
              style={{
                marginRight: '4%',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: 16,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Main.Screen name="Chat" component={Chat} />
    </Main.Navigator>
  );
};

export default MainNavigation;
