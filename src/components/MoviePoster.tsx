import { POSTER_PATH } from '@env';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Movie } from '../interfaces/MoviesDB';

type Props = {
  movie: Movie;
  width?: number;
  height?: number;
};

const MoviePoster = ({ movie, height = 420, width = 300 }: Props) => {
  const navigation = useNavigation();
  const poster = `${POSTER_PATH}${movie.poster_path}`;
  const defImg =
    'https://video-smo.geodata.gov.hk/AVideo/view/img/notfound_portrait.jpg';

  return (
    <TouchableOpacity
      style={{ ...styles.card, width, height }}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('Detail', movie);
      }}
    >
      <Image
        source={{
          uri: poster || defImg,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  card: {
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 10,
    borderRadius: 18,
    marginHorizontal: 12,
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});
