import React, { useContext, useEffect } from 'react';
import Carousel from 'react-native-snap-carousel';
import { POSTER_PATH } from '@env';

import { View, ActivityIndicator, Dimensions, ScrollView } from 'react-native';

import { useMovies } from '../hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MoviePoster from '../components/MoviePoster';
import HorizontalSlider from '../components/HorizontalSlider';

import Logo from '../assets/fakeflix.svg';
import GradientBg from '../components/GradientBg';
import { getImageColors } from '../helpers/getColors';
import { GradientContext } from '../context/GradientContext';

type Props = {};

const Home = (props: Props) => {
  const { top } = useSafeAreaInsets();
  const { colors, setColors, setPrevColors } = useContext(GradientContext);
  const { nowPlaying, popular, topRated, upcoming, isLoading } = useMovies();
  const windowSize = Dimensions.get('screen');

  const getPosterColors = async (index = 0) => {
    const movie = nowPlaying[index];
    console.log('🎥', movie);
    const uri = `${POSTER_PATH}${movie.poster_path}`;

    const [primary, secondary] = await getImageColors(uri);

    setPrevColors(colors);
    setColors({ primary, secondary });
  };

  useEffect(() => {
    getPosterColors();
    console.log('áers');
  }, [nowPlaying]);

  return (
    <>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
        >
          <ActivityIndicator color="green" size={100} />
        </View>
      ) : (
        <GradientBg>
          <ScrollView>
            <View style={{ marginTop: top + 20 }}>
              <View style={{ height: 500 }}>
                <View
                  style={{
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  <Logo width={120} height={40} />
                </View>
                <Carousel
                  data={nowPlaying}
                  renderItem={({ item }: any) => <MoviePoster movie={item} />}
                  sliderWidth={windowSize.width}
                  itemWidth={300}
                  itemHeight={450}
                  inactiveSlideOpacity={0.5}
                  onSnapToItem={index => getPosterColors(index)}
                />
              </View>

              <View>
                <HorizontalSlider
                  height={200}
                  width={140}
                  title="Popular movies"
                  data={popular}
                />

                <HorizontalSlider
                  height={200}
                  width={140}
                  title="Top rated"
                  data={topRated}
                />
                <HorizontalSlider
                  height={200}
                  width={140}
                  title="Comming soon"
                  data={upcoming}
                />
              </View>
            </View>
          </ScrollView>
        </GradientBg>
      )}
    </>
  );
};

export default Home;
