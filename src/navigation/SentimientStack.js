import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SentimientScreen } from '../screens/Sentiment';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export const SentimientStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SentimientStack"
        component={SentimientScreen}
      />
    </Stack.Navigator>
  );
};

