import { HomeScreen, MakesScreen } from '@/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        options={{ title: 'Главная' }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="MakesScreen"
        options={{ title: 'Все Бренды' }}
        component={MakesScreen}
      />
    </Stack.Navigator>
  );
}
