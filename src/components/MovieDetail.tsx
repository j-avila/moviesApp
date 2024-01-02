import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'currency-formatter';
import Rating from './Rating';
import Button from './Button';
import ActorCard from './ActorCard';

import { MovieData, useMovieDetails } from '../hooks/useMovieDetails';

interface Props {
  details: any;
  movie: any;
}

function calculateRating(rating: number): number {
  return Math.max(1, Math.round(rating / 2));
}

const MovieDetail = ({ details, movie }: Props) => {
  const navigation = useNavigation();
  const { credits, isLoading } = useMovieDetails(movie.id);

  return (
    <>
      <View style={styles.movieInfo}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      <Rating rating={calculateRating(details.vote_average)} />
      <ScrollView horizontal style={styles.genres}>
        {details.genres?.map(({ id, name }) => (
          <Text key={id} style={styles.chip}>
            {name}
          </Text>
        ))}
      </ScrollView>
      <Button
        text="play"
        icon="play"
        onPress={() =>
          navigation.navigate('Movie', {
            name: movie.original_title,
            id: movie.id,
          })
        }
      />
      <View style={styles.movieInfo}>
        <View>
          <Text
            style={{ ...styles.subtitle, color: 'black', fontWeight: 'bold' }}
          >
            OverView:
          </Text>

          <Text>{movie.overview}</Text>
        </View>
      </View>
      <>
        <View
          style={{
            ...styles.movieInfo,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{ ...styles.subtitle, color: 'black', fontWeight: 'bold' }}
          >
            Budget:
          </Text>
          <Text>{format(details.budget, { code: 'USD' })}</Text>
        </View>
        <Text
          style={{
            ...styles.subtitle,
            color: 'black',
            fontWeight: 'bold',
            marginLeft: 20,
          }}
        >
          Cast:
        </Text>
        <FlatList
          style={{ paddingLeft: 15 }}
          data={credits?.cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ActorCard data={item} />}
          horizontal
        />
      </>
    </>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  movieInfo: {
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 8,
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
  genres: {
    marginLeft: 20,
    marginVertical: 10,
    flexDirection: 'row',
    gap: 5,
  },
  chip: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#7670798a',
    color: 'white',
    borderRadius: 10,
    marginRight: 5,
  },
});
