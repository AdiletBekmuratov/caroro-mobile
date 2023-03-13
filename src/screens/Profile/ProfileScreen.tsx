import React, { FC, useMemo } from 'react';
import { Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons/';
import tw from 'twrnc';

import { ButtonGroup, IButtonGroup, IconButton } from '@/components/Forms';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/auth';
import { ProfileStackScreenProps } from '@/types/index';

export const ProfileScreen: FC<ProfileStackScreenProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const buttons = useMemo<IButtonGroup['buttons']>(
    () => [
      {
        children: <Text>Настройки</Text>,
        onPress: () => {},
      },
      {
        children: <Text>Загрузка водительских прав</Text>,
        onPress: () => navigation.navigate('DocumentUploadScreen'),
      },
      {
        children: <Text>Уведомления</Text>,
        onPress: () => {},
      },
      {
        children: <Text style={tw`text-red-500`}>Выйти</Text>,
        onPress: () => dispatch(logout()),
      },
    ],
    [],
  );
  return (
    <View style={tw`flex-1 p-5 bg-gray-100 w-full gap-5`}>
      <View style={tw`flex-row gap-5`}>
        <View style={tw`w-2/5 relative`}>
          <Image
            source={{
              uri: 'https://source.unsplash.com/random/',
            }}
            style={tw`w-full h-52 rounded-lg`}
          />
          <IconButton
            onPress={() => {}}
            style="bg-white rounded-full items-center justify-center absolute -right-3 -top-3 p-2 shadow"
            name="cloud-upload"
          />
        </View>

        <View style={tw`gap-2 flex-grow`}>
          <Text style={tw`font-bold text-gray-500`}>
            Имя: <Text style={tw`font-normal`}>Adilet</Text>
          </Text>
          <Text style={tw`font-bold text-gray-500`}>
            Фамилия: <Text style={tw`font-normal`}>Bekmuratov</Text>
          </Text>
          <Text style={tw`font-bold text-gray-500`}>
            Номер: <Text style={tw`font-normal`}>+7 (775) 321 4191</Text>
          </Text>

          <View
            style={tw`bg-white rounded-lg items-center justify-center p-2 flex-grow`}
          >
            <Text style={tw`text-lg text-center`}>12</Text>
            <Text style={tw`text-xs text-center text-gray-500`}>
              Кол-во заказов
            </Text>
          </View>
          <View
            style={tw`bg-white rounded-lg items-center justify-center p-2 flex-grow`}
          >
            <Text style={tw`text-lg text-center text-blue-400`}>Ожидание</Text>
            <Text style={tw`text-xs text-center text-gray-500`}>Статус</Text>
          </View>
        </View>
      </View>
      <ButtonGroup containerStyle="" buttons={buttons} />
    </View>
  );
};
