import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends TouchableOpacityProps {
  icon?: string;
  text: string;
  color?: string;
}

const Button = ({
  icon = undefined,
  text = 'press',
  color = 'goldenrod',
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: color }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {icon && <Icon name={icon} size={25} color="white" />}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
