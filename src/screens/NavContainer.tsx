import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import SnackBar from '@/components/SnackBar';
import Spinner from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addUser } from '@/redux/slices/auth';
import { initSettings } from '@/redux/slices/settings';
import AuthStack from '@/stacks/AuthStack';
import MainBottomTabs from '@/stacks/BottomStack';
import MapScreenModal from './Maps/MapScreenModal';
import tw from '@/config/twrnc';

export default function NavContainer() {
  const dispatch = useAppDispatch();
  const { token, isLoading } = useAppSelector(state => state.auth);

  const { firstTime, isLoading: isLoadingSettings } = useAppSelector(
    state => state.settings,
  );

  useEffect(() => {
    const init = async () => {
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
          <MapScreenModal />
          {token ? <MainBottomTabs /> : <AuthStack />}
          <SnackBar />
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
