import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  contentContainer: {
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
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
