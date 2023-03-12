import { ButtonGroup, IButtonGroup } from '@/components/Forms';
import { ProfileStackScreenProps } from '@/types/index';
import React, { ComponentProps, FC, useMemo } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export const ProfileScreen: FC<ProfileStackScreenProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  const buttons = useMemo<IButtonGroup['buttons']>(
    () => [
      {
        children: <Text>Настройки</Text>,
        onPress: () => {},
      },
      {
        children: <Text>Загруженные документы</Text>,
        onPress: () => navigation.navigate('DocumentUploadScreen'),
      },
      {
        children: <Text>Уведомления</Text>,
        onPress: () => {},
      },
      {
        children: <Text>Выйти</Text>,
        onPress: () => {},
      },
    ],
    [],
  );
  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <ButtonGroup containerStyle="mt-6" buttons={buttons} />
    </SafeAreaView>
  );
};
