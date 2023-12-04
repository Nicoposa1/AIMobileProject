import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeStack} from './HomeStack';
import {ImageGeneratorScreen} from '../screens/ImageGeneratorSreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ImageGeneratorScreen"
        component={ImageGeneratorScreen}
      />
    </Tab.Navigator>
  );
};
