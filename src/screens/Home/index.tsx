import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {API_KEY} from '@env';
import axios from 'axios';
import styles from './styles';
import {Input} from '../../components/Input';
import {TopNavigator} from '../../components/TopNavigator';
import {useNavigation} from '@react-navigation/native';

import {NavigationProp, ParamListBase} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

global.Buffer = global.Buffer || require('buffer').Buffer;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [input, setInput] = React.useState<string>('');
  console.log('🚀 ~ file: index.tsx:32 ~ input:', input);
  const [imageData, setImageData] = React.useState<String>('');
  const [loading, setLoading] = React.useState(false);

  const query = async (QueryData: {inputs: String}) => {
    try {
      const response = await axios({
        url: 'https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4',
        method: 'post',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: QueryData,
        responseType: 'arraybuffer',
      });
      const mineType = response.headers['content-type'];
      const result = response.data;

      const base64 = Buffer.from(result, 'binary').toString('base64');
      const img = `data:${mineType};base64,${base64}`;
      return img;
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const data = {inputs: input};
      const response = await query(data);
      if (response !== undefined) {
        setImageData(response);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <TopNavigator
        title="Image Generator"
        nextScreen={() => {
          navigation.navigate('TranslatorScreen');
        }}
        lastScreen={() => {
          navigation.navigate('ChatScreen');
        }}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled>
          <SafeAreaView style={styles.subContainer}>
            <View style={styles.inputContainer}>
              {loading ? (
                <View style={styles.image}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              ) : imageData !== '' ? (
                <Image style={styles.image} source={{uri: `${imageData}`}} />
              ) : (
                <View style={styles.image} />
              )}
            </View>
            <Input onSubmit={onSubmit} setInput={setInput} input={input} />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};
