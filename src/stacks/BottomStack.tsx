import MaterialCommunity from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from '@/screens/Home';
import { ComponentProps } from 'react';
import { BottomTabParamList } from '../types';
import ProfileStack from './ProfileStack';
import MapScreen from '@/screens/MapScreen';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type MaterialCommunityName = ComponentProps<typeof MaterialCommunity>['name'];

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function MainBottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: 'Главная',
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: MaterialCommunityName = focused
              ? 'home'
              : 'home-outline';

            return (
              <MaterialCommunity name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: 'Профиль',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: MaterialIconName = focused
              ? 'person'
              : 'person-outline';

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
        }}
      />
    </Tab.Navigator>
  );
}
