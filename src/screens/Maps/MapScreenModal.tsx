import tw from '@/config/twrnc';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';

import { Button, IconButton, Status, SwipeToConfirm } from '@/components/Forms';
import FullScreenModal from '@/components/FullScreenModal';
import MapView from '@/components/MapView';
import Spinner from '@/components/Spinner';
import { useCountdown } from '@/hooks/index';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  useCancelOrderMutation,
  useGetOneOrderQuery,
  useStartOrderMutation,
} from '@/redux/services/order.service';
import { useGetAddressFromLatLngQuery } from '@/redux/services/osm.service';
import { closeAllMapModals } from '@/redux/slices/mapModals';

const MapScreen = () => {
  const dispatch = useAppDispatch();

  const MINUTES = useRef<number>(0);
  const [startOrder] = useStartOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const { waitModalScreen, orderId } = useAppSelector(state => state.mapModals);
  const { data: order, isLoading: isLoadingOrder } = useGetOneOrderQuery(
    orderId,
    { skip: !orderId },
  );
  const { data: location, isLoading: isLoadingLocation } =
    useGetAddressFromLatLngQuery(
      {
        latLng: [order?.vehicle.lat, order?.vehicle.lon],
      },
      { skip: !order },
    );

  const [status1, setStatus1] = useState(Status.Initial);
  let { mm, ss, isComplete } = useCountdown(MINUTES.current);

  useEffect(() => {
    const getTime = () => {
      let orderTime: number = 0;

      orderTime = new Date(order?.createdAt).getTime() + 15 * 60 * 1000;
      MINUTES.current = orderTime;
    };
    if (order && !isLoadingOrder) {
      getTime();
    }
    return () => {};
  }, [order]);

  useEffect(() => {
    if (isComplete) {
      console.log('finished');
    }
  }, [isComplete]);

  const handleCancelOrder = () => {
    cancelOrder(orderId).then(() => {
      dispatch(closeAllMapModals());
    });
  };

  const handleStartOrder = async () => {
    await startOrder(orderId).then(() => {
      dispatch(closeAllMapModals());
    });
  };

  if (isLoadingLocation || isLoadingOrder) {
    return <Spinner />;
  }

  return (
    <FullScreenModal visible={waitModalScreen}>
      <View style={tw`flex-1 relative w-full`}>
        <MapView
          style="h-full w-full"
          latLng={[order?.vehicle.lat, order?.vehicle.lon]}
        />
        <View
          style={tw`absolute p-5 m-5 mb-10 bg-white shadow rounded-lg left-0 right-0 bottom-0 gap-5`}
        >
          <View style={tw`flex-row items-center gap-5`}>
            <IconButton
              size={18}
              style="bg-black"
              color="#fff"
              name="clock-o"
              disabled
            />
            <View>
              {MINUTES.current > 0 && (
                <Text style={tw`font-bold text-2xl`}>{`${mm}:${ss}`}</Text>
              )}
              <Text style={tw`text-gray-500`}>Бесплатное ожидание</Text>
            </View>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-bold text-lg`}>{order?.vehicle.model}</Text>
            <Text style={tw`font-bold text-lg`}>
              {order?.vehicle.plateNumber}
            </Text>
          </View>

          <View>
            <Text style={tw`font-bold`}>
              Адрес:{' '}
              <Text style={tw`font-normal text-gray-500`}>
                {location?.display_name}
              </Text>
            </Text>
          </View>
          <View style={tw`gap-2`}>
            <SwipeToConfirm
              containerStyle={tw`${
                status1 === Status.Confirmed ? 'bg-green-500' : ''
              }`}
              onStatusChange={(s: Status) => setStatus1(s)}
              onConfirm={handleStartOrder}
            >
              <Text style={tw`text-white text-xs`}>
                {status1 === Status.Confirmed
                  ? 'Подтверждено'
                  : status1 === Status.Verifying
                  ? 'Загрузка'
                  : 'Проведите, чтобы подтвердить'}
              </Text>
            </SwipeToConfirm>
            <Button style="bg-red-500" onPress={handleCancelOrder}>
              Отмена
            </Button>
          </View>
        </View>
      </View>
    </FullScreenModal>
  );
};

export default MapScreen;
