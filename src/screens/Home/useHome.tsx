import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../../navigation/MainNavigation';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {IUsers, Users} from '../../Constants/Users';

export interface ChatRoom {
  id: string;
  lastUpdated: {
    seconds: string;
    nanoseconds: string;
  };
}

export const useHome = () => {
  const [userEmail, setUserEmail] = useState<any>(auth().currentUser?.email);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [chatRooms, setChatRooms] = useState<(ChatRoom | IUsers)[]>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('lastUpdated', 'desc')
      .onSnapshot(snapshot => {
        const firestoreData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as ChatRoom[];
        const missingUsers = Users.filter(
          user => !firestoreData.some(room => room.id === user.id),
        );
        const combinedData = [...firestoreData, ...missingUsers];

        setChatRooms(combinedData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleItemPress = (item: IUsers) => {
    navigation.navigate('Chat', {
      chat: item,
    });
  };

  return {handleItemPress, userEmail, chatRooms};
};
