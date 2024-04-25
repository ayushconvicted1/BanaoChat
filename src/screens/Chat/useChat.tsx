import {useEffect, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../../navigation/MainNavigation';
import {Users} from '../../Constants/Users';

export const useChat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userEmail, setUserEmail] = useState<any>(auth().currentUser?.email);
  const route = useRoute<any>();
  const doc = route.params.chat.id;

  console.log(doc);

  useEffect(() => {
    const querySnapShot = firestore()
      .collection('chats')
      .doc(doc)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    querySnapShot.onSnapshot(snapShot => {
      const allMessages: any = snapShot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate(),
        };
      });
      setMessages(allMessages);
    });
  }, []);

  const onSend = (messages: IMessage[]) => {
    const msg = messages[0];
    const newMsg: any = {
      ...msg,
      senderId: userEmail,
      user: {
        name: userEmail[4],
        _id: userEmail,
      },
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMsg),
    );
    firestore()
      .collection('chats')
      .doc(doc)
      .collection('messages')
      .add({
        ...newMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    firestore().collection('chats').doc(doc).set(
      {
        lastUpdated: firestore.FieldValue.serverTimestamp(),
        users: route.params.chat.users,
      },
      {merge: true},
    );
  };

  return {messages, setMessages, onSend, userEmail};
};
