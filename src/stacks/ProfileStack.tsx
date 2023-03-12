import { LoginScreen, RegisterScreen } from '@/screens/Auth';
import { DocumentUploadScreen, ProfileScreen } from '@/screens/Profile';
import { ProfileStackParamList } from '@/types/profile.stack.type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="DocumentUploadScreen"
        component={DocumentUploadScreen}
      />
    </Stack.Navigator>
  );
}
