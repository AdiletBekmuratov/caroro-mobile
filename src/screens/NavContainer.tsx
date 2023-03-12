import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';

import SnackBar from '@/components/SnackBar';
import Spinner from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addUser } from '@/redux/slices/auth';
import { initSettings } from '@/redux/slices/settings';
import AuthStack from '@/stacks/AuthStack';
import Demo from './Demo';
import MainBottomTabs from '@/stacks/BottomStack';

export default function NavContainer() {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, isSuccess } = useAppSelector(
    state => state.auth,
  );

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
          <MainBottomTabs />
          {/* {user ? <MainBottomTabs /> : <AuthStack />} */}
          <SnackBar />
        </KeyboardAvoidingView>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
