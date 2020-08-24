import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { userReducerTypes } from '../reducers/user';

const UserTile = (user) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch({ type: userReducerTypes.SET_CURRENT_USER, payload: user });
    dispatch({ type: userReducerTypes.SET_CURRENT_USER_PHOTOS, payload: [] });
    navigation.navigate('Details');
  };

  return <Button onPress={onPress} title={user.username} />;
};

export default UserTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
