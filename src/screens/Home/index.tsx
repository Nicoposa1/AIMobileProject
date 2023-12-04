import {Image, SafeAreaView, Text, TextInput, View} from 'react-native';
import React from 'react';
import {API_KEY} from '@env';
import axios from 'axios';
import styles from './styles';

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
      console.log(response);
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Image Generator</Text>
      {/* <Image 
        style={styles.image}
        source={{uri: imageData}}
      /> */}
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        onChangeText={setInput}
        value={input}
      />
    </SafeAreaView>
  );
};
