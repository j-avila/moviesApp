import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  rating?: number;
};

export const Stars = ({ rate }: { rate: number }) => {
  if (rate === 0 || !rate) {
    return <Icon name="star-outline" size={20} color="#FFC700" />;
  }
  return [...Array(rate)].map((item, index) => (
    <Icon key={`${item}-${index}`} name="star" size={20} color="#FFC700" />
  ));
};

const Rating = ({ rating }: Props) => {
  const rate = Math.floor(rating || 0);

  return (
    <View style={styles.rate}>
      <Stars rate={rate} />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  rate: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 0,
    marginHorizontal: 20,
  },
});
