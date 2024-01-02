import { Image, StyleSheet, Text, View } from 'react-native';
import { POSTER_PATH } from '@env';
import React from 'react';
import { Cast } from '../interfaces/MovieCredits';

type Props = {
  data: Cast;
};

type Iloader = {
  height?: number;
  width?: number;
};

const ActorCard = ({
  data: { profile_path, character, original_name },
}: Props) => {
  const actorImg =
    `${POSTER_PATH}${profile_path}` ||
    'https://e7.pngegg.com/pngimages/355/848/png-clipart-computer-icons-user-profile-google-account-s-icon-account-miscellaneous-sphere-thumbnail.png';
  return (
    <>
      {!profile_path && !character && !original_name ? (
        <Text>loading...</Text>
      ) : (
        <View style={styles.cardContainer}>
          {profile_path && (
            <Image style={styles.thumb} source={{ uri: actorImg }} />
          )}
          <View>
            <Text style={styles.title}>{character}</Text>
            <Text style={styles.subtitle}>{original_name}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default ActorCard;

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#e5e5e5',
    marginRight: 8,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#4b4b4b',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 10,
    color: 'grey',
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 8,
  },
});
