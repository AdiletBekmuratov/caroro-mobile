import store from "@/redux/store";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import NavContainer from "./screens/NavContainer";

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <StatusBar style="auto" />
          <NavContainer />
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
