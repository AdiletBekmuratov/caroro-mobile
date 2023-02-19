import axiosInstance from "@/config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const register = async (userData) => {
  const response = await axiosInstance.post("/user/register", userData);

  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axiosInstance.post("/user/login", userData);

  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  await AsyncStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
