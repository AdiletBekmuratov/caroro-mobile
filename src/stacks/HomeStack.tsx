import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  HomeScreen,
  MakesScreen,
  VehicleScreen,
  VehiclesScreen,
} from '@/screens/Home';
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
      <Stack.Screen
        name="VehicleScreen"
        options={({ route }) => ({ title: route.params.vehicle.title })}
        component={VehicleScreen}
      />
      <Stack.Screen
        name="VehiclesScreen"
        options={({ route }) => ({
          title: 'Все Автомобили ' + (route.params?.title ?? ''),
        })}
        component={VehiclesScreen}
      />
    </Stack.Navigator>
  );
}
