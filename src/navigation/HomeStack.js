import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/Home';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
    </Stack.Navigator>
  );
};
