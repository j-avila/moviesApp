import React, { useContext, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient as Gradient } from 'react-native-linear-gradient';
import { GradientContext } from '../context/GradientContext';
import { useFade } from '../hooks/useFade';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const GradientBg = ({ children }: Props) => {
  const {
    colors: { primary, secondary },
    setPrevColors,
  } = useContext(GradientContext);

  const { fadeIn, fadeOut, opacity } = useFade();

  useEffect(() => {
    fadeIn(() => {
      setPrevColors({ primary, secondary });
      fadeOut();
    });
  }, [primary, secondary]);

  return (
    <View style={{ flex: 1 }}>
      <Gradient
        colors={[primary, secondary, 'white']}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.8, y: 0.8 }}
      />

      <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity }}>
        <Gradient
          colors={[primary, secondary, 'white']}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      </Animated.View>
      {children}
    </View>
  );
};

export default GradientBg;
