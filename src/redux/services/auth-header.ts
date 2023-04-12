import { IToken } from '@/types/auth.type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader() {
  const jsonValue = await AsyncStorage.getItem('token');
  const token: IToken | null = jsonValue != null ? JSON.parse(jsonValue) : null;
  if (token && token.accessToken) {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
    };
  } else {
    return {};
  }
}
