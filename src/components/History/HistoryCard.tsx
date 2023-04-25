import { View, Text } from 'react-native';
import React, { FC } from 'react';

import tw from '@/config/twrnc';
import { HistoryStackScreenProps, Order } from '@/types/index';
import { Button } from '../Forms';
import { useAppDispatch } from '@/redux/hooks';
import {
  openInProgressModalScreen,
  openPendingModalScreen,
} from '@/redux/slices/mapModals';
import {
  orderStatusColor,
  translateOrderStatus,
} from '@/utils/order-status-translate';
import { useNavigation } from '@react-navigation/native';

export const HistoryCard: FC<Order> = ({
  id,
  createdAt,
  status,
  vehicle,
  finalPrice,
}) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<HistoryStackScreenProps<'HistoryScreen'>['navigation']>();
  const handleNavigate = () => {
    switch (status) {
      case 'pending':
        dispatch(openPendingModalScreen({ orderId: id }));
        break;
      case 'inprogress':
        dispatch(openInProgressModalScreen({ orderId: id }));
        break;
      default:
        break;
    }
  };
  return (
    <View style={tw`flex-grow bg-white p-5 rounded-lg gap-4`}>
      <View style={tw`flex-row justify-between relative`}>
        <Text style={tw`text-2xl font-bold`}>{`${vehicle.make?.name} ${vehicle.model}`}</Text>
      </View>

      <View>
        <Text style={tw`font-bold text-base`}>
          Номер машины:{' '}
          <Text style={tw`font-normal text-gray-500`}>
            {vehicle.plateNumber}
          </Text>
        </Text>
        <Text style={tw`font-bold text-base`}>
          Дата заказа:{' '}
          <Text style={tw`font-normal text-gray-500`}>
            {new Date(createdAt).toLocaleString()}
          </Text>
        </Text>
        <Text style={tw`font-bold text-base`}>
          Cтатус:{' '}
          <Text style={tw`font-normal ${orderStatusColor(status)}`}>
            {translateOrderStatus(status)}
          </Text>
        </Text>
        {status === 'completed' && (
          <Text style={tw`font-bold text-base`}>
            Стоимость поездки:{' '}
            <Text style={tw`font-normal text-gray-500`}>{finalPrice}</Text>
          </Text>
        )}
      </View>

      <View style={tw`flex-row relative gap-2`}>
        <Button
          mod="outlined"
          onPress={() =>
            navigation.navigate('HomeStack', {
              screen: 'VehicleScreen',
              initial: false,
              params: { vehicle: { title: vehicle.model, id: vehicle.id } },
            })
          }
          style="flex-1"
        >
          Детали
        </Button>
        {(status === 'pending' || status === 'inprogress') && (
          <Button onPress={handleNavigate} style="flex-1">
            Перейти
          </Button>
        )}
      </View>
    </View>
  );
};
