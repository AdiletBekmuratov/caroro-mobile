import { ComponentProps } from 'react';
import MaterialCommunity from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomTabParamList } from '../types';
import ArticlesStack from './ArticlesStack';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
type MaterialCommunityName = ComponentProps<typeof MaterialCommunity>['name'];

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function MainBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Главная',
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
        name="ArticlesStack"
        component={ArticlesStack}
        options={{
          title: 'Новости',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: MaterialCommunityName = focused
              ? 'newspaper-variant'
              : 'newspaper-variant-outline';

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
