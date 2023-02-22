import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '@/config/axios';
import { LoginFormData, RegisterFormData } from '@/types/index';

const register = async (userData: RegisterFormData) => {
  const response = await axiosInstance.post('/auth/register', userData);

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData: LoginFormData) => {
  const response = await axiosInstance.post('/auth/login', userData);

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  await AsyncStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
