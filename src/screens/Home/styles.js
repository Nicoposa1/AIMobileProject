import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
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
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
