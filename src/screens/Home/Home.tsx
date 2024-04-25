import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useHome} from './useHome';
import {IUsers} from '../../Constants/Users';

const Home: React.FC = () => {
  const {handleItemPress, userEmail, chatRooms} = useHome();

  const renderItem = ({item}: {item: IUsers}) => (
    <>
      {item.users.includes(userEmail[4]) ? (
        <TouchableOpacity
          onPress={() => handleItemPress(item)}
          style={styles.listItem}>
          <Text style={styles.listItemText}>
            {item.id === '111111'
              ? 'Group'
              : `User ${item.id
                  .match(/\d/g)
                  ?.join('')
                  .replace(userEmail[4], '')}`}
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userEmail}</Text>
      <FlatList data={chatRooms} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default Home;
