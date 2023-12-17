import {
  ActivityIndicator,
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
import {TopNavigator} from '../../components/TopNavigator';
import {useNavigation} from '@react-navigation/native';

export const SentimientScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState('');
  const [response, setResponse] = React.useState({});
  const handleInputTextChange = text => {
    setInputText(text);
  };

  const fetchAnswer = async () => {
    setLoading(true);
    setResponse({});
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
      setLoading(false);
      setResponse(result);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavigator
        title="Sentiment Analysis"
        nextScreen={() => {
          navigation.navigate('LargeScreen');
        }}
        lastScreen={() => {
          navigation.navigate('TranslatorScreen');
        }}
      />
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
            keyboardVerticalOffset={100}
            behavior="padding">
            <View
              style={{
                width: '100%',
              }}>
              {loading && <ActivityIndicator size="large" color="#007bff" />}
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
    </>
  );
};
