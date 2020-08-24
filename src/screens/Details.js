import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { loadPhotos } from '../utils/unsplashFetcher';
import { userReducerTypes } from '../reducers/user';
import { FlatGrid } from 'react-native-super-grid';
import PhotoTile from '../components/PhotoTile';

const Details = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const {
    currentUser: {
      username,
      profile_image: { large },
      links: { photos: photosLink },
    },
    photos,
  } = useSelector((state) => state.user);

  const fetchPhotos = async () => {
    try {
      const photos = await loadPhotos({ url: photosLink });
      setLoadingPhotos(false);
      dispatch({ type: userReducerTypes.SET_CURRENT_USER_PHOTOS, payload: photos });
    } catch (error) {
      console.log(error);
      setLoadingPhotos(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Back"
        />
        <Text style={styles.title}>{username}</Text>
        <Image style={styles.logo} source={{ uri: large }} />
      </View>
      {loadingPhotos && <ActivityIndicator />}
      {photos.length > 0 && (
        <View style={styles.gridContainer}>
          <FlatGrid
            itemDimension={130}
            data={photos}
            renderItem={({ item }) => <PhotoTile {...item} />}
            keyExtractor={({ id }) => id}
          />
        </View>
      )}
      {loadError && <Text>Error while loading the photos</Text>}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 60,
  },
  gridContainer: {
    marginTop: 150,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#081229',
  },
  title: {
    color: '#ec5990',
    fontSize: 36,
    marginBottom: 25,
  },
  header: {
    display: 'flex',
    height: 100,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
