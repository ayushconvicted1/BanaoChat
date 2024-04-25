import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import {NoAuthNavigationProps} from '../../navigation/NoAuthNavigation';

export const useSignin = () => {
  const navigation = useNavigation<NoAuthNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Main');
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        ToastAndroid.show('Incorrect email or password!', ToastAndroid.SHORT);
      } else if (error.code === 'auth/user-not-found') {
        ToastAndroid.show('User not found!', ToastAndroid.SHORT);
      } else if (error.code === 'auth/invalid-email') {
        ToastAndroid.show('Invalid email address!', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          'An error occurred. Please try again later.',
          ToastAndroid.SHORT,
        );
      }

      console.error('Sign-in error:', error);
    }
  };

  return {email, setEmail, password, setPassword, handleSignIn};
};
