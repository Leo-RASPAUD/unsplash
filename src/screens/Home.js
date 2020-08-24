import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native';
import { searchUser } from '../utils/unsplashFetcher';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { userReducerTypes } from '../reducers/user';
import { FlatGrid } from 'react-native-super-grid';
import UserTile from '../components/UserTile';

const Home = () => {
  const dispatch = useDispatch();
  const { searchUserResults, userToSearch, currentPage } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  const fetchUser = async ({ user, isLoadMore = false }) => {
    const newPage = isLoadMore ? currentPage + 1 : 1;

    setLoading(true);
    setError(false);

    if (!isLoadMore) {
      setNoMoreData(false);
    }

    try {
      const { results } = await searchUser({ user, page: newPage });

      if (!isLoadMore && results.length === 0) {
        dispatch({ type: userReducerTypes.SET_USER_SEARCH_RESULTS, payload: [] });
        setNotFound(true);
      } else {
        if ((isLoadMore && results.length === 0) || results.length < 10) {
          setNoMoreData(true);
        }
        setNotFound(false);
        dispatch({
          type: userReducerTypes.SET_USER_SEARCH_RESULTS,
          payload: isLoadMore ? searchUserResults.concat(results) : results,
        });
        dispatch({
          type: userReducerTypes.SET_CURRENT_PAGE,
          payload: newPage,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
      dispatch({ type: userReducerTypes.SET_USER_SEARCH_RESULTS, payload: [] });
    }
  };

  const onSubmit = ({ user }) => {
    fetchUser({ user });
  };

  const loadMore = ({ user }) => {
    fetchUser({ user, isLoadMore: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>unsplashLookup</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Search user</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                dispatch({ type: userReducerTypes.SET_USER_TO_SEARCH, payload: value });
              }}
              value={userToSearch}
              disabled={loading}
            />
          )}
          name="user"
          rules={{ required: true }}
          defaultValue={userToSearch}
        />
      </View>
      {errors.user && <Text style={styles.error}>This is required.</Text>}
      <View style={styles.search}>
        <Button title="Search" color="#081229" onPress={handleSubmit(onSubmit)} />
      </View>
      {searchUserResults.length > 0 && (
        <FlatGrid
          itemDimension={130}
          data={searchUserResults}
          renderItem={({ item }) => <UserTile {...item} />}
          keyExtractor={({ id }) => id}
        />
      )}
      <View>
        {loading && <ActivityIndicator />}
        {searchUserResults.length > 0 && !noMoreData && (
          <View style={styles.search}>
            <Button
              color="#081229"
              style={styles.search}
              title="Load more"
              onPress={handleSubmit(loadMore)}
              disabled={loading}
            />
          </View>
        )}
        {notFound && <Text style={styles.text}>Oops! Could not find any users.</Text>}
        {error && <Text style={styles.text}>Error while loading the data, please try again</Text>}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  text: { color: 'white', fontSize: 24 },
  error: { color: 'red', fontSize: 16, paddingBottom: 10 },
  title: {
    color: '#ec5990',
    fontSize: 36,
    marginBottom: 25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    backgroundColor: '#081229',
  },
  input: {
    padding: 15,
    borderColor: '#ec5990',
    borderRadius: 4,
    borderWidth: 1,
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
    minWidth: 200,
  },
  inputContainer: {
    alignItems: 'center',
  },
  inputTitle: {
    borderBottomColor: '#bf1650',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 24,
    minWidth: 200,
  },
  search: {
    fontSize: 24,
    minWidth: 200,
    marginBottom: 10,
    borderColor: '#ec5990',
    borderRadius: 4,
    borderWidth: 1,
  },
});
