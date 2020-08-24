import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userReducerTypes } from '../reducers/user';
import { TouchableHighlight } from 'react-native-gesture-handler';

const PhotoTile = (photo) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch({ type: userReducerTypes.SET_SELECTED_PHOTO, payload: photo });
    navigation.navigate('Carousel');
  };

  return (
    <TouchableHighlight onPress={onPress}>
      <Image style={styles.logo} source={{ uri: photo.urls.thumb }} onPress={onPress} />
    </TouchableHighlight>
  );
};

export default PhotoTile;

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 100,
  },
});
