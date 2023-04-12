import React, { useState, useLayoutEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import tw from '@/config/twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IconButton } from '@/components/Forms';
import MapView from '@/components/MapView';
import Spinner from '@/components/Spinner';
import { useGetAddressFromLatLngQuery } from '@/redux/services/osm.service';
import { Status, SwipeToConfirm } from '@/components/Forms';
import { useCountdown } from '@/hooks/index';
import FullScreenModal from '@/components/FullScreenModal';
import { useAppSelector } from '@/redux/hooks';

const MapScreen = () => {
  const MINUTES = useRef<number>(0);
  const { waitModalScreen } = useAppSelector(state => state.mapModals);

  useLayoutEffect(() => {
    const getTime = async () => {
      const order_end_time = await AsyncStorage.getItem('order_end_time');
      let orderTime: number = 0;

      if (order_end_time) {
        const endTime = JSON.parse(order_end_time) as number;
        orderTime = endTime;
      } else {
        orderTime = new Date().getTime() + 15 * 60 * 1000;
        await AsyncStorage.setItem(
          'order_end_time',
          JSON.stringify(new Date().getTime() + 15 * 60 * 1000),
        );
      }

      MINUTES.current = orderTime;
    };
    getTime();
    return () => {};
  }, []);

  const [status1, setStatus1] = useState(Status.Initial);
  let [dd, hh, mm, ss] = useCountdown(MINUTES.current);
  const { data, isLoading } = useGetAddressFromLatLngQuery({
    latLng: [51.0759203, 71.39658065],
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FullScreenModal visible={waitModalScreen}>
      <View style={tw`flex-1 relative w-full`}>
        <MapView style="h-full w-full" latLng={[51.0759203, 71.39658065]} />
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
              <Text style={tw`font-bold text-2xl`}>
                {mm}:{ss}
              </Text>
              <Text style={tw`text-gray-500`}>Бесплатное ожидание</Text>
            </View>
          </View>

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`font-bold text-lg`}>БМВ Х5</Text>
            <Text style={tw`font-bold text-lg`}>777GGG01</Text>
          </View>

          <View>
            <Text style={tw`font-bold`}>
              Адрес:{' '}
              <Text style={tw`font-normal text-gray-500`}>
                {data.display_name}
              </Text>
            </Text>
          </View>

          <SwipeToConfirm
            containerStyle={tw`${
              status1 === Status.Confirmed ? 'bg-green-500' : ''
            }`}
            onStatusChange={(s: Status) => setStatus1(s)}
            onConfirm={function () {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  return resolve({});
                }, 1000);
              });
            }}
          >
            <Text style={tw`text-white text-xs`}>
              {status1 === Status.Confirmed
                ? 'Подтверждено'
                : status1 === Status.Verifying
                ? 'Загрузка'
                : 'Проведите, чтобы подтвердить'}
            </Text>
          </SwipeToConfirm>
        </View>
      </View>
    </FullScreenModal>
  );
};

export default MapScreen;
