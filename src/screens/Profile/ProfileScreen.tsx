import React, { FC, useMemo, useState } from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import tw from '@/config/twrnc';

import {
  ButtonGroup,
  IButtonGroup,
  IconButton,
  Switch,
} from '@/components/Forms';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/auth';
import { ProfileStackScreenProps } from '@/types/index';
import { setVibrate } from '@/redux/slices/settings';
import { useFindMeQuery } from '@/redux/services/profile.service';
import Spinner from '@/components/Spinner';
import { statusColor, translateStatus } from '@/utils/status-translate';
import { useGetMyOrdersQuery } from '@/redux/services/order.service';

export const ProfileScreen: FC<ProfileStackScreenProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { data: dataOrders = [], isLoading: isLoadingOrders } =
    useGetMyOrdersQuery();

  const { vibrate } = useAppSelector(state => state.settings);
  const [vibrateLocal, setVibrateLocal] = useState(vibrate);

  const { data, isLoading } = useFindMeQuery();

  const handleVibrate = async () => {
    setVibrateLocal(prev => !prev);
    dispatch(setVibrate(!vibrate));
  };

  const buttons = useMemo<IButtonGroup['buttons']>(
    () => [
      {
        children: <Text>Загрузка водительских прав</Text>,
        onPress: () => navigation.navigate('DocumentUploadScreen'),
      },
      {
        children: <Text>Изменение данных аккаунта</Text>,
        onPress: () => navigation.navigate('EditProfileScreen'),
      },
      {
        children: <Text style={tw`text-red-400`}>Выйти</Text>,
        onPress: () => dispatch(logout()),
      },
    ],
    [],
  );

  const buttonsSettings = useMemo<IButtonGroup['buttons']>(
    () => [
      {
        children: (
          <View style={tw`flex-row justify-between items-center -mx-1 -my-2`}>
            <Text>Вибрация</Text>
            <Switch value={vibrateLocal} onValueChange={handleVibrate} />
          </View>
        ),
      },
    ],
    [vibrateLocal],
  );

  if (isLoading || isLoadingOrders) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <ScrollView contentContainerStyle={tw`p-5 gap-5`}>
        <View style={tw`flex-row gap-5`}>
          <View style={tw`w-2/5 relative`}>
            <Image
              source={{
                uri: 'https://www.w3schools.com/howto/img_avatar.png',
              }}
              style={tw`w-full h-52 rounded-lg bg-white`}
            />
            <IconButton
              onPress={() => {}}
              style="bg-white rounded-full items-center justify-center absolute -right-3 -top-3 p-2 shadow"
              name="cloud-upload"
            />
          </View>
          <View style={tw`gap-2 flex-grow`}>
            <Text style={tw`font-bold text-gray-500`}>
              Имя: <Text style={tw`font-normal`}>{data.firstname}</Text>
            </Text>
            <Text style={tw`font-bold text-gray-500`}>
              Фамилия: <Text style={tw`font-normal`}>{data.lastname}</Text>
            </Text>
            <Text style={tw`font-bold text-gray-500`}>
              Номер: <Text style={tw`font-normal`}>{data.phone}</Text>
            </Text>

            <View
              style={tw`bg-white rounded-lg items-center justify-center p-2 flex-grow`}
            >
              <Text style={tw`text-lg text-center`}>{dataOrders.length}</Text>
              <Text style={tw`text-xs text-center text-gray-500`}>
                Кол-во заказов
              </Text>
            </View>
            <View
              style={tw`bg-white rounded-lg items-center justify-center p-2 flex-grow`}
            >
              <Text style={tw`text-lg text-center ${statusColor(data.status)}`}>
                {translateStatus(data.status)}
              </Text>
              <Text style={tw`text-xs text-center text-gray-500`}>Статус</Text>
            </View>
          </View>
        </View>

        <ButtonGroup containerStyle="" buttons={buttons} />

        <View>
          <Text style={tw`mb-1 text-gray-500`}>Настройки</Text>
          <ButtonGroup containerStyle="" buttons={buttonsSettings} />
        </View>
      </ScrollView>
    </View>
  );
};
