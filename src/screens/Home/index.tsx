import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {API_KEY} from '@env';
import axios from 'axios';
import styles from './styles';

global.Buffer = global.Buffer || require('buffer').Buffer;

export const HomeScreen = () => {
  const [input, setInput] = React.useState<string>('');
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Image Generator</Text>
        <View style={styles.contentContainer}>
          {loading ? (
            <View style={styles.image}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : imageData !== '' ? (
            <Image style={styles.image} source={{uri: `${imageData}`}} />
          ) : (
            <View style={styles.image} />
          )}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter text"
              onChangeText={setInput}
              value={input}
            />
            <TouchableOpacity onPress={onSubmit}>
              <Image
                style={styles.icon}
                source={require('../../assets/images/send-message.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
