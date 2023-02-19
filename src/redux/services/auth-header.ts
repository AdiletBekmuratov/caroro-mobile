import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function authHeader() {
  const jsonValue = await AsyncStorage.getItem("user");
  const user = jsonValue != null ? JSON.parse(jsonValue) : null;
  if (user && user.accessToken) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };
  } else {
    return {};
  }
}
