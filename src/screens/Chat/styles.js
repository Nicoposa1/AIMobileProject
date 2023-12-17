import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionBox: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  answer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    marginVertical: 30,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
