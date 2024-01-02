import { IMAGES_PATH } from '@env';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HorizontalSlider from '../components/HorizontalSlider';
// hooks
import { useTrailer } from '../hooks/useTrailer';
import { useMovieDetails } from '../hooks/useMovieDetails';
// types
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigations/HomeStack';
import { PuneHedgehog } from '../interfaces/WatchServices';

interface Props extends StackScreenProps<RootStackParams, 'Movie'> {}

// UI items
const ServiceIcon = ({ data }: any) => {
  const service = data.item;
  return (
    <TouchableOpacity activeOpacity={0.5} style={{ marginRight: 8 }}>
      <Image
        width={60}
        height={60}
        style={{ borderRadius: 20 }}
        source={{ uri: `${IMAGES_PATH}original${service.logo_path}` }}
      />
    </TouchableOpacity>
  );
};

const ServicesItem = ({ results }: { results: PuneHedgehog }) => {
  // console.log('🫠', results);
  let services = Object.keys(results);

  return (
    <>
      {services?.length > 0 ? (
        services.map(service => (
          <>
            {service !== 'link' ? (
              <View style={styles.servicesContainer}>
                <Text>{service}</Text>
                <FlatList
                  data={results[service]}
                  horizontal
                  renderItem={data => <ServiceIcon data={data} />}
                />
              </View>
            ) : (
              <View style={styles.linkContainer}>
                <Text>More info</Text>
                <Icon
                  size={20}
                  name="open-outline"
                  onPress={() => Linking.openURL(results[service])}
                />
              </View>
            )}
          </>
        ))
      ) : (
        <Text>Not avialble in yout country</Text>
      )}
    </>
  );
};

const Movie = ({
  route: {
    params: { name, id },
  },
}: Props) => {
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);
  const { trailer } = useTrailer({ id });
  const { suggestions, watchServices } = useMovieDetails(Number(id));
  const ticketsURL = `https://www.google.com/search?q=${name}+tickets`;

  const onStateChange = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const Cinema = require('../assets/cinema.png');

  useEffect(() => {
    console.log(name, id);
  }, []);

  return (
    <View>
      <>
        {trailer?.id ? (
          <>
            <YoutubePlayer
              height={220}
              play={playing}
              videoId={`${trailer.key}`}
              webViewProps={{
                containerStyle: {
                  position: 'relative',
                  zIndex: -1,
                },
              }}
              onChangeState={onStateChange}
            />
          </>
        ) : (
          <Text> pos nah </Text>
        )}
      </>
      <View style={{ ...styles.shadow, ...styles.titleContainer }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back-circle-outline"
            style={styles.backButton}
            size={30}
            color="#ddddddb5"
          />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
      </View>

      <ScrollView style={{ height: 500, paddingHorizontal: 10 }}>
        <Text style={styles.title}>View it in: </Text>

        {/* Streaing services aviability */}
        {watchServices?.results.hasOwnProperty('CL') ? (
          <ServicesItem results={watchServices?.results.CL} />
        ) : (
          <TouchableOpacity
            onPress={() => Linking.openURL(ticketsURL)}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Image source={Cinema} style={{ width: 200, height: 200 }} />
            <Text style={styles.title}>Watch it in you're nerarest cinema</Text>
          </TouchableOpacity>
        )}

        {/* suggestions */}
        {suggestions?.results?.length >= 1 && (
          <View style={styles.moviesSugContainer}>
            <HorizontalSlider
              width={120}
              height={200}
              title="Similar movies"
              data={suggestions.results}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
    zIndex: -1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  backButton: {
    padding: 10,
  },
  servicesContainer: {
    gap: 6,
    marginVertical: 5,
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
  },
  moviesSugContainer: {},
  shadow: {
    backgroundColor: 'goldenrod',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
