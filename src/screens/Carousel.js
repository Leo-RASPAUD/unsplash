import React from 'react';
import { View, Button, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CarouselWrapper = () => {
  const navigation = useNavigation();

  const { selectedPhoto } = useSelector((state) => state.user);
  return (
    <View style={{ flex: 1, height: '100%', width: '100%' }}>
      <Image style={{ flex: 1, height: '100%', width: '100%' }} source={{ uri: selectedPhoto.urls.full }} />
      <Button onPress={() => navigation.navigate('Details')} title="Go back" />
    </View>
  );
};

export default CarouselWrapper;
