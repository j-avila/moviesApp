import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// views
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import MoviePlayer from '../screens/MoviePlayer';
// types
import { Movie } from '../interfaces/MoviesDB';
export type RootStackParams = {
  Home: undefined;
  Detail: Movie;
  Movie: {
    name: string;
    id: string;
  };
};

const Stack = createStackNavigator<RootStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Movie" component={MoviePlayer} />
    </Stack.Navigator>
  );
};

export default HomeStack;
