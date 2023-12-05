import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from './HomeStack';
import {ImageGeneratorScreen} from '../screens/ImageGeneratorSreen';
import {Image, Text} from 'react-native';
import styles from '../screens/Home/styles';
import {Translator} from '../screens/Translator';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ImageGeneratorScreen"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? 'blue' : 'gray'}}>
              Image Generator
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/image.png')}
              style={[styles.icon, {tintColor: focused ? 'blue' : 'gray'}]}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text style={{color: focused ? 'blue' : 'gray'}}>Translator</Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/images/translation.png')}
              style={{
                tintColor: focused ? 'blue' : 'gray',
                height: 20,
                width: 20,
              }}
            />
          ),
        }}
        name="TranslatorScreen"
        component={Translator}
      />
    </Tab.Navigator>
  );
};
