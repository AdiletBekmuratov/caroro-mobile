import { View, Text, Dimensions } from 'react-native';
import React, { FC, useState } from 'react';
import * as Location from 'expo-location';

import tw from '@/config/twrnc';
import { Button } from '../Forms';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import { useNavigation } from '@react-navigation/native';
import { Vehicle } from '@/types/vehicle.type';
import { ImageCarousel } from './ImageCarousel';
import { useAppDispatch } from '@/redux/hooks';
import { addMessage } from '@/redux/slices/message';
import { useCreateOrderMutation } from '@/redux/services/order.service';
import { openPendingModalScreen } from '@/redux/slices/mapModals';
import { API_URL } from '@/redux/http';

const { width } = Dimensions.get('window');

export const Card: FC<Vehicle> = ({
  id,
  model,
  make,
  engine,
  gearbox,
  vehicleType,
  companyId,
  images,
  price,
}) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<HomeStackScreenProps<'HomeScreen'>['navigation']>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [createOrder] = useCreateOrderMutation();

  const handleCreateOrder = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      dispatch(
        addMessage({
          message: 'Разрешение на доступ к местоположению было отклонено',
        }),
      );
      return;
    }
    const order = await createOrder({
      companyId: companyId,
      vehicleId: id,
    }).unwrap();
    dispatch(openPendingModalScreen({ orderId: order.id }));
  };

  return (
    <View style={tw`flex-grow bg-white p-5 rounded-lg gap-4`}>
      <View style={tw`flex-row justify-between relative`}>
        <Text style={tw`text-2xl font-bold`}>{`${make?.name} ${model}`}</Text>
      </View>
      <View style={tw`rounded-lg overflow-hidden`}>
        <ImageCarousel
          width={width - 20 * 4}
          height={150}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={images.map(item => ({
            uri: item.link.replace('http://localhost:3333/api', API_URL),
          }))}
        />
      </View>
      <View style={tw`flex-row gap-2 justify-between items-end`}>
        <View style={tw`flex-row gap-2`}>
          <Text style={tw`text-gray-600`}>{gearbox.name}</Text>
          <Text style={tw`text-gray-600`}>|</Text>
          <Text style={tw`text-gray-600`}>{engine.name}</Text>
          <Text style={tw`text-gray-600`}>|</Text>
          <Text style={tw`text-gray-600`}>{vehicleType.name}</Text>
        </View>
        <Text style={tw`font-bold`}>
          {price} KZT
          <Text style={tw`text-gray-500 font-normal`}>/мин</Text>
        </Text>
      </View>

      <View style={tw`flex-row relative gap-2`}>
        <Button
          mod="outlined"
          onPress={() =>
            navigation.navigate('VehicleScreen', {
              vehicle: { title: model, id },
            })
          }
          style="flex-1"
        >
          Детали
        </Button>
        <Button onPress={handleCreateOrder} style="flex-1">
          Заказать
        </Button>
      </View>
    </View>
  );
};
