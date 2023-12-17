import {View, Text, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

export const TopNavigator = ({title, nextScreen, lastScreen}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          lastScreen();
        }}
        style={{
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/right-arrow.png')}
          style={{
            transform: [{rotate: '180deg'}],
            height: 20,
            width: 20,
          }}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          nextScreen();
        }}>
        <Image
          source={require('../../assets/images/right-arrow.png')}
          style={{
            height: 20,
            width: 20,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
