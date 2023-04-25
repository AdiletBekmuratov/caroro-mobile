import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import SnackBar from '@/components/SnackBar';
import Spinner from '@/components/Spinner';
import tw from '@/config/twrnc';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addUser } from '@/redux/slices/auth';
import { closeAllMapModals } from '@/redux/slices/mapModals';
import { addMessage } from '@/redux/slices/message';
import { initSettings } from '@/redux/slices/settings';
import AuthStack from '@/stacks/AuthStack';
import MainBottomTabs from '@/stacks/BottomStack';
import OnboardingScreen from './OnBoardingScreen';
import { MapModalsWrapper } from './Maps';

export default function NavContainer() {
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector(state => state.auth);

  const { firstTime, isLoading: isLoadingSettings } = useAppSelector(
    state => state.settings,
  );

  useEffect(() => {
    const init = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        dispatch(
          addMessage({
            message: 'Разрешение на доступ к местоположению было отклонено',
          }),
        );
      }
      dispatch(closeAllMapModals());
      await dispatch(initSettings());
      await dispatch(addUser());
    };
    init();
  }, [dispatch]);

  if (isLoadingSettings) {
    return <Spinner />;
  }

  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw`flex-1 relative`}
        >
          {isLoading && <Spinner />}
          <MapModalsWrapper />
          {firstTime ? (
            <OnboardingScreen />
          ) : token ? (
            <MainBottomTabs />
          ) : (
            <AuthStack />
          )}
          <SnackBar />
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
