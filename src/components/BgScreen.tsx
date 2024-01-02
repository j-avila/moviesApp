import { Animated, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Button from './Button';
import { useFade } from '../hooks/useFade';

const BgScreen = () => {
  const opacity = useRef(new Animated.Value(0.1)).current;
  const { fadeIn, fadeOut } = useFade(opacity);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{
          width: 150,
          height: 150,
          marginBottom: 20,
          backgroundColor: '#084F6A',
          borderColor: 'white',
          borderWidth: 10,
          opacity: opacity,
        }}
      ></Animated.View>
      <Button text="in" onPress={fadeIn} />
      <Button text="out" onPress={fadeOut} />
    </View>
  );
};

export default BgScreen;
