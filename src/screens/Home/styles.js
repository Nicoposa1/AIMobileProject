import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
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
  }
});
