import { HomeScreen, MakesScreen } from '@/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../types';
import { VehicleScreen } from '@/screens/Home/VehicleScreen';

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
    </Stack.Navigator>
  );
}
