import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {API_KEY} from '@env';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {Input} from '../../components/Input';
import {TopNavigator} from '../../components/TopNavigator';
import {useNavigation} from '@react-navigation/native';

export const Translator = () => {
  const navigation = useNavigation();

  const [translatedText, setTranslatedText] = React.useState('');
  console.log(
    '🚀 ~ file: index.js:18 ~ Translator ~ translatedText:',
    translatedText,
  );
  const [inputText, setInputText] = React.useState('');
  const [language, setLanguage] = React.useState('en-es');

  const query = async () => {
    Keyboard.dismiss();

    try {
      const response = await axios({
        url: `https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-${language}`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'text/plain',
        },
        data: inputText,
      });
      console.log(response.data);
      setTranslatedText(response.data[0].translation_text);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputTextChange = text => {
    setInputText(text);
  };

  const handleLanguageChange = lang => {
    setLanguage(lang);
  };

  return (
    <>
      <TopNavigator
        title="Translator"
        nextScreen={() => {
          navigation.navigate('SentimentScreen');
        }}
        lastScreen={() => {
          navigation.navigate('ImageGeneratorScreen');
        }}
      />
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
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <TouchableOpacity style={styles.inputContainer}>
                <RNPickerSelect
                  textInputProps={{color: 'white'}}
                  onValueChange={lang => {
                    console.log('changed');
                    setLanguage(lang);
                  }}
                  items={[
                    {label: 'English to Spanish', value: 'en-es'},
                    {label: 'English to German', value: 'en-de'},
                    {label: 'English to French', value: 'en-fr'},
                  ]}
                  value={language}
                  placeholder={{
                    label: 'English to Spanish',
                    value: 'en-es',
                    color: 'white',
                  }}
                  style={{
                    placeholder: {
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 'bold',
                      height: 40,
                      width: 200,
                    },
                    inputIOS: {
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 'bold',
                      height: 40,
                      width: 200,
                      textAlign: 'center',
                    },
                  }}
                />
              </TouchableOpacity>
              {translatedText ? (
                <Text style={styles.title}>{translatedText}</Text>
              ) : null}
        

              <Input
                onSubmit={query}
                setInput={handleInputTextChange}
                input={inputText}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};
