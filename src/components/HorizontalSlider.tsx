import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MoviePoster from './MoviePoster';
import { Movie } from '../interfaces/MoviesDB';

type Props = {
  title?: string;
  data: Movie[];
  height?: number;
  width?: number;
};

const HorizontalSlider = ({
  title,
  height = 360,
  width = 240,
  data,
}: Props) => {
  return (
    <View style={{ height: height + 80 }}>
      {title && <Text style={styles.title}>{title}</Text>}

      <FlatList
        horizontal
        data={data}
        renderItem={({ item }) => (
          <MoviePoster movie={item} width={width} height={height} />
        )}
      />
    </View>
  );
};

export default HorizontalSlider;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15,
    color: 'black',
  },
});
