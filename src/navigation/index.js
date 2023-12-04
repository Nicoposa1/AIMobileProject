import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTabs} from './BottomTabs';

export const Navigator = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};
