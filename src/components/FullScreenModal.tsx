import tw from '@/config/twrnc';
import MapScreen from '@/screens/Maps/MapScreenModal';
import { Portal } from '@gorhom/portal';
import React, { FC, ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type IModalProps = {
  children?: ReactNode;
  visible: boolean;
};

const FullScreenModal: FC<IModalProps> = ({ children, visible }) => {
  if (!visible) {
    return <></>;
  }

  return (
    <Portal>
      <TouchableWithoutFeedback
        style={tw`absolute inset-0 items-center justify-center`}
      >
        <SafeAreaView style={tw`absolute inset-0 items-center justify-center`}>
          {children}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Portal>
  );
};

export default FullScreenModal;
