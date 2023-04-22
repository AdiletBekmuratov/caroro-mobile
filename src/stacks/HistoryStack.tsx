import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HistoryScreen } from '@/screens/History';
import { HistoryStackParamList } from '../types';

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export default function HistoryStack() {
  return (
    <Stack.Navigator initialRouteName="HistoryScreen">
      <Stack.Screen
        name="HistoryScreen"
        options={{ title: 'История' }}
        component={HistoryScreen}
      />
    </Stack.Navigator>
  );
}
