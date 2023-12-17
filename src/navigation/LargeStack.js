import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LargeScreen } from '../screens/Large';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export const LargeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="LargeStack"
        component={LargeScreen}
      />
    </Stack.Navigator>
  );
};

