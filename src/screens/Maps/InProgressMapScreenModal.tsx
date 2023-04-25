import tw from '@/config/twrnc';
import * as Location from 'expo-location';
import React from 'react';
import { Text, View } from 'react-native';

import { Button, IconButton } from '@/components/Forms';
import FullScreenModal from '@/components/FullScreenModal';
import Spinner from '@/components/Spinner';
import { useCountup } from '@/hooks/index';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  useCompleteOrderMutation,
  useGetOneOrderQuery,
} from '@/redux/services/order.service';
import { closeAllMapModals } from '@/redux/slices/mapModals';
import { addMessage } from '@/redux/slices/message';

export const InProgressMapScreenModal = () => {
  const dispatch = useAppDispatch();
  const [compeleteOrder] = useCompleteOrderMutation();

  const { inprogressModalScreen, orderId } = useAppSelector(
    state => state.mapModals,
  );
  const { data: order, isLoading: isLoadingOrder } = useGetOneOrderQuery(
    orderId,
    { skip: !orderId },
  );

  let { dd, hh, mm, ss } = useCountup(new Date(order?.startedAt).getTime());

  const handleCompleteOrder = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      dispatch(
        addMessage({
          message: 'Разрешение на доступ к местоположению было отклонено',
        }),
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    await compeleteOrder({
      id: orderId,
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    }).then(() => {
      dispatch(closeAllMapModals());
    });
  };

  if (isLoadingOrder) {
    return <Spinner />;
  }

  return (
    <FullScreenModal
      visible={inprogressModalScreen}
      onRequestClose={() => dispatch(closeAllMapModals())}
    >
      <View style={tw`flex-1 relative w-full p-5 gap-5`}>
        <View style={tw`flex-row items-center gap-5`}>
          <IconButton
            size={18}
            style="bg-black"
            color="#fff"
            name="clock-o"
            disabled
          />
          <View>
            <Text
              style={tw`font-bold text-2xl`}
            >{`${dd}:${hh}:${mm}:${ss}`}</Text>
            <Text style={tw`text-gray-500`}>Время поездки</Text>
          </View>
        </View>

        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`font-bold text-lg`}>{order?.vehicle.model}</Text>
          <Text style={tw`font-bold text-lg`}>
            {order?.vehicle.plateNumber}
          </Text>
        </View>

        <View style={tw`gap-2`}>
          <Button onPress={handleCompleteOrder}>Завершить поездку</Button>
        </View>
      </View>
    </FullScreenModal>
  );
};
