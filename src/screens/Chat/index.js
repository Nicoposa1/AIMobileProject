import {
  TextInput,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Text,
} from 'react-native';
import React from 'react';
import styles from './styles';
import axios from 'axios';
import {API_KEY} from '@env';
export const ChatScreen = () => {
  const [input, setInput] = React.useState('');
  const [generatedText, setGeneratedText] = React.useState('');
  const [context, setContext] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [response, setResponse] = React.useState({});

  const fetchAnswer = async () => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/deepset/roberta-base-squad2',
        {
          question: input,
          context: context,
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
      <View style={{width: '80%'}}>
        <Text style={styles.title}>Context</Text>
        <TextInput
          style={styles.questionBox}
          placeholder="Enter text"
          onChangeText={setContext}
          value={context}
        />
        <Text style={[styles.title, {marginTop: 20}]}>Question</Text>
        <TextInput
          style={styles.questionBox}
          placeholder="Enter text"
          onChangeText={setInput}
          value={input}
        />
        <TouchableOpacity onPress={fetchAnswer} style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {response ? (
        <View>
          <Text style={styles.title}>Answer</Text>
          <Text style={styles.answer}>{response.answer}</Text>
          <Text style={styles.title}>Score</Text>
          <Text style={styles.answer}>{response.score.toFixed(3)}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};
