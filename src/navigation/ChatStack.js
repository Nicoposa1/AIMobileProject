import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatScreen} from '../screens/Chat';

// Create a stack navigator
const Stack = createNativeStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ChatStack"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

