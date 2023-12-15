import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import styles from './styles';
import axios from 'axios';
import {API_KEY} from '@env';
import {Input} from '../../components/Input';

export const SentimientScreen = () => {
  const [inputText, setInputText] = React.useState('');
  const [response, setResponse] = React.useState({});
  console.log(
    '🚀 ~ file: index.js:19 ~ SentimientScreen ~ response:',
    response,
  );
  const handleInputTextChange = text => {
    setInputText(text);
  };

  const fetchAnswer = async () => {
    Keyboard.dismiss();
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}
          keyboardVerticalOffset={10}
          behavior="padding">
          <Text style={styles.title}>Sentiment Analysis</Text>
          <View
            style={{
              width: '100%',
            }}>
            {Object.keys(response).length !== 0 && (
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'semibold',
                  }}>
                  Your text is{' '}
                  <Text
                    style={{
                      color:
                        response?.[0]?.[0].label === 'POSITIVE'
                          ? 'green'
                          : 'red',
                    }}>
                    {response?.[0]?.[0].score.toFixed(2)}{' '}
                  </Text>
                  <Text
                    style={{
                      color:
                        response?.[0]?.[0].label === 'POSITIVE'
                          ? 'green'
                          : 'red',
                    }}>
                    {response?.[0]?.[0].label === 'POSITIVE'
                      ? 'positive'
                      : 'negative'}
                  </Text>{' '}
                  and{' '}
                  <Text
                    style={{
                      color:
                        response?.[0]?.[0].label === 'NEGATIVE'
                          ? 'green'
                          : 'red',
                    }}>
                    {response?.[0]?.[1].score.toFixed(2)}{' '}
                  </Text>
                  <Text
                    style={{
                      color:
                        response?.[0]?.[0].label === 'NEGATIVE'
                          ? 'green'
                          : 'red',
                    }}>
                    {response?.[0]?.[0].label === 'NEGATIVE'
                      ? 'positive'
                      : 'negative'}
                  </Text>
                </Text>
              </View>
            )}
          </View>
          <Input
            onSubmit={fetchAnswer}
            setInput={handleInputTextChange}
            input={inputText}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
