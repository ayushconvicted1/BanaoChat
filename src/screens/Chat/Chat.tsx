import {View, Text} from 'react-native';
import React from 'react';
import {useChat} from './useChat';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  const {messages, setMessages, onSend, userEmail} = useChat();
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userEmail,
        name: userEmail[4],
      }}
    />
  );
};

export default Chat;
