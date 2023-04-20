import { View, Text, Dimensions } from 'react-native';
import React, { FC, useState } from 'react';
import tw from '@/config/twrnc';
import { Button } from '../Forms';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import { useNavigation } from '@react-navigation/native';
import { Vehicle } from '@/types/vehicle.type';
import { ImageCarousel } from './ImageCarousel';

const { width, height } = Dimensions.get('window');

export const Card: FC<Vehicle> = ({
  id,
  model,
  engine,
  gearbox,
  vehicleType,
  images,
}) => {
  const navigation =
    useNavigation<HomeStackScreenProps<'HomeScreen'>['navigation']>();
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <View style={tw`flex-grow bg-white p-5 rounded-lg gap-4`}>
      <View style={tw`flex-row justify-between relative`}>
        <Text style={tw`text-2xl font-bold`}>{model}</Text>
      </View>
      <View style={tw`rounded-lg overflow-hidden`}>
        <ImageCarousel
          width={width - 20 * 4}
          height={150}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          data={images.map(item => ({
            uri: item.link.replace(
              'http://localhost:3333',
              'http://192.168.0.14:3333',
            ),
          }))}
        />
      </View>

      <View style={tw`flex-row relative gap-2`}>
        <Text style={tw`text-gray-600`}>{gearbox.name}</Text>
        <Text style={tw`text-gray-600`}>|</Text>
        <Text style={tw`text-gray-600`}>{engine.name}</Text>
        <Text style={tw`text-gray-600`}>|</Text>
        <Text style={tw`text-gray-600`}>{vehicleType.name}</Text>
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
        <Button onPress={() => {}} style="flex-1">
          Заказать
        </Button>
      </View>
    </View>
  );
};
