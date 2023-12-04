import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ImageGeneratorScreen} from '../screens/ImageGeneratorSreen';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export const ImageGeneratorStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ImageGeneratorStack"
        component={ImageGeneratorScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
