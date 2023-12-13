import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './styles';
import axios from 'axios';
import {API_KEY} from '@env';

export const SentimientScreen = () => {
  const [inputText, setInputText] = React.useState('');
  const [response, setResponse] = React.useState({});
  const handleInputTextChange = text => {
    setInputText(text);
  };

  const fetchAnswer = async () => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english',
        {
          inputs: inputText,
        },
        {
          headers: {Authorization: `Bearer ${API_KEY}`},
        },
      );
      const result = response.data;
      setResponse(result);
      console.log(JSON.stringify(result));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleInputTextChange}
          value={inputText}
          placeholder="Enter text"
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchAnswer()}>
          <Image
            source={require('../../assets/images/send-message.png')}
            style={{
              height: 20,
              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      {response && (
        <>
          <Text>Positive</Text>
          <Text>{response?.[0]?.[0].score.toFixed(3)}</Text>
          <Text>Negative</Text>
          <Text>{response?.[0]?.[1].score.toFixed(3)}</Text>
        </>
      )}
    </SafeAreaView>
  );
};
