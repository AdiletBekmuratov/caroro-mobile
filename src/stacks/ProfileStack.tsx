import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DocumentUploadScreen,
  EditProfileScreen,
  ProfileScreen,
} from '@/screens/Profile';
import { ProfileStackParamList } from '@/types/profile.stack.type';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        options={{ title: 'Профиль' }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfileScreen"
        options={{ title: 'Изменение данных аккаунта' }}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="DocumentUploadScreen"
        options={{ title: 'Загрузка водительских прав' }}
        component={DocumentUploadScreen}
      />
    </Stack.Navigator>
  );
}
