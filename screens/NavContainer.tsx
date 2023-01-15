import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import tw from "twrnc";

import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addUser } from "@/redux/slices/auth";
import { initSettings } from "@/redux/slices/settings";
import { NavigationContainer } from "@react-navigation/native";
import SnackBar from "@/components/SnackBar";
import { clearMessage } from "@/redux/slices/message";
import Demo from "./Demo";

export default function NavContainer() {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.auth
  );

  const { message } = useAppSelector((state) => state.message);

  const { firstTime, isLoading: isLoadingSettings } = useAppSelector(
    (state) => state.settings
  );

  const onDismissSnackBar = () => dispatch(clearMessage());

  useEffect(() => {
    const init = async () => {
      await dispatch(initSettings());
      await dispatch(addUser());
    };
    init();
  }, [dispatch]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1 justify-center items-center relative`}
        >
          <Demo />

          <SnackBar
            duration={3000}
            visible={
              message !== null && message !== undefined && message.length > 0
            }
            setVisible={onDismissSnackBar}
            onDismiss={onDismissSnackBar}
            text={message}
          />
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
