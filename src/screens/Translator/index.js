import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HfInference} from '@huggingface/inference';
import {API_KEY} from '@env';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {Input} from '../../components/Input';

export const Translator = () => {
  const [translatedText, setTranslatedText] = React.useState('');
  console.log(
    '🚀 ~ file: index.js:18 ~ Translator ~ translatedText:',
    translatedText,
  );
  const [inputText, setInputText] = React.useState('');
  const [language, setLanguage] = React.useState('en-es');

  const languageModels = {
    'en-es': 'Helsinki-NLP/opus-mt-en-es',
    'en-de': 'Helsinki-NLP/opus-mt-en-de',
    'en-fr': 'Helsinki-NLP/opus-mt-en-fr',
  };
  const query = async () => {
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
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={handleLanguageChange}
            items={[
              {label: 'English to Spanish', value: 'en-es'},
              {label: 'English to German', value: 'en-de'},
              {label: 'English to French', value: 'en-fr'},
            ]}
            value={language}
          />
        </View>
        <Input
          onSubmit={query}
          setInput={handleInputTextChange}
          input={inputText}
        />
        {translatedText ? (
          <Text style={styles.title}>{translatedText}</Text>
        ) : null}
      </View>
    </View>
  );
};
