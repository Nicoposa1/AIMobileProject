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

export const LargeScreen = () => {
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
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        {
          inputs: inputText,
        },
        {
          headers: {Authorization: `Bearer ${API_KEY}`},
        },
      );
      const result = response.data;
      setResponse(result);
      setLoading(false);
      console.log(JSON.stringify(result));
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavigator
        title="Large Text"
        nextScreen={() => {
          navigation.navigate('ChatScreen');
        }}
        lastScreen={() => {
          navigation.navigate('SentimentScreen');
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
                marginTop: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  fontWeight: '700',
                  fontSize: 20,
                  marginBottom: 20,
                }}>
                Generate Text
              </Text>
              {loading && <ActivityIndicator size="large" color="#007bff" />}
              {Object.keys(response).length !== 0 && (
                <View>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontWeight: 'semibold',
                    }}>
                    {response[0].summary_text}
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
