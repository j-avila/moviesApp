import { POSTER_PATH } from '@env';
import React, { useEffect } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigations/HomeStack';
import { useMovieDetails } from '../hooks/useMovieDetails';
import MovieDetail from '../components/MovieDetail';

interface Props extends StackScreenProps<RootStackParams, 'Detail'> {}
const { height: screenHeight } = Dimensions.get('screen');

const Detail = ({ route }: Props) => {
  const navigation = useNavigation();
  const movie = route.params;
  const { details, isLoading } = useMovieDetails(movie.id);
  const poster = `${POSTER_PATH}${movie.poster_path}`;
  const defImg =
    'https://video-smo.geodata.gov.hk/AVideo/view/img/notfound_portrait.jpg';

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <ActivityIndicator color="green" size={100} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.posterContainer}>
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-circle-outline"
            style={styles.backButton}
            size={30}
            color="#ddddddb5"
          />
        </TouchableHighlight>
        <Image source={{ uri: poster || defImg }} style={styles.posterImage} />
      </View>
      {details && movie && <MovieDetail details={details} movie={movie} />}
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  posterContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 8,
    overflow: 'hidden',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  posterImage: {
    flex: 1,
    zIndex: -1,
    position: 'relative',
  },
  backButton: {
    zIndex: 20,
    top: 10,
    left: 5,
    position: 'absolute',
  },
  subtitle: {
    fontSize: 16,
    color: '#8d8d8d',
  },
  title: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
  },
});
