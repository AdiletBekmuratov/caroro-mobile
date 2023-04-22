import { View, Text } from 'react-native';
import React, { FC } from 'react';

import tw from '@/config/twrnc';
import { Order } from '@/types/index';
import { Button } from '../Forms';
import { useAppDispatch } from '@/redux/hooks';
import { openWaitModalScreen } from '@/redux/slices/mapModals';
import {
  orderStatusColor,
  translateOrderStatus,
} from '@/utils/order-status-translate';

export const HistoryCard: FC<Order> = ({
  id,
  createdAt,
  status,
  vehicle,
  finalPrice,
}) => {
  const dispatch = useAppDispatch();
  const handleNavigate = () => {
    switch (status) {
      case 'pending':
        dispatch(openWaitModalScreen({ orderId: id }));
        break;
      default:
        break;
    }
  };
  return (
    <View style={tw`bg-white p-5 rounded-lg`}>
      <Text style={tw`${orderStatusColor(status)}`}>
        {translateOrderStatus(status)}
      </Text>
      <Button onPress={handleNavigate}>Перейти</Button>
    </View>
  );
};
