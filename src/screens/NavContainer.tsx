import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as Location from 'expo-location';

import SnackBar from '@/components/SnackBar';
import Spinner from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addUser } from '@/redux/slices/auth';
import { initSettings } from '@/redux/slices/settings';
import AuthStack from '@/stacks/AuthStack';
import MainBottomTabs from '@/stacks/BottomStack';
import tw from '@/config/twrnc';
import OnboardingScreen from './OnBoardingScreen';
import { addMessage } from '@/redux/slices/message';
import { PendingMapScreenModal } from './Maps';
import { InProgressMapScreenModal } from './Maps/InProgressMapScreenModal';

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
          <PendingMapScreenModal />
          <InProgressMapScreenModal />
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
