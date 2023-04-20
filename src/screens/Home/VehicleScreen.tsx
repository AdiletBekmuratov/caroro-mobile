import React, { FC, useState } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { Button } from '@/components/Forms';
import Spinner from '@/components/Spinner';
import { ImageCarousel, LocationCard, SpecCard } from '@/components/Vehicles';
import tw from '@/config/twrnc';
import { useGetOneVehicleQuery } from '@/redux/services/vehicles.service';
import { HomeStackScreenProps } from '@/types/home.stack.type';

const { width, height } = Dimensions.get('window');

export const VehicleScreen: FC<HomeStackScreenProps<'VehicleScreen'>> = ({
  route,
}) => {
  const { data, isLoading } = useGetOneVehicleQuery(route.params.vehicle.id);
  const [visible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <ImageView
        images={data.images.map(item => ({
          uri: item.link.replace(
            'http://localhost:3333',
            'http://192.168.0.14:3333',
          ),
        }))}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <ScrollView contentContainerStyle={tw`gap-4`}>
        <View style={tw`bg-white rounded-b-3xl overflow-hidden`}>
          <ImageCarousel
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            setVisible={setIsVisible}
            height={height * 0.35}
            width={width}
            data={data.images.map(item => ({
              uri: item.link.replace(
                'http://localhost:3333',
                'http://192.168.0.14:3333',
              ),
            }))}
          />
        </View>
        <View style={tw`px-5 pb-5 gap-4`}>
          <View style={tw`gap-2`}>
            <Text style={tw`text-xl font-bold`}>Описание</Text>
            <Text style={tw`text-base`}>{data.description}</Text>
          </View>

          <View style={tw`gap-2`}>
            <Text style={tw`text-xl font-bold`}>Характеристики</Text>
            <View style={tw`gap-2 flex-row flex-wrap`}>
              <SpecCard
                title="Производитель"
                description={data.make.name}
                style="flex-grow"
              />
              <SpecCard
                title="Тип кузова"
                description={data.vehicleType.name}
                style="flex-grow"
              />
              <SpecCard
                title="КПП"
                description={data.gearbox.name}
                style="flex-grow"
              />
              <SpecCard
                title="Тип двигателя"
                description={data.engine.name}
                style="flex-grow"
              />
              <SpecCard
                title="Год"
                description={data.year.toString()}
                style="flex-grow"
              />
              <SpecCard
                title="Год"
                description={data.plateNumber.toString()}
                style="flex-grow"
              />
            </View>
          </View>

          <View style={tw`gap-2`}>
            <Text style={tw`text-xl font-bold`}>Владелец</Text>
            <View style={tw`gap-2 flex-row flex-wrap`}>
              <SpecCard
                title="Название"
                description={data.company.name}
                style="flex-grow"
              />
              <SpecCard
                title="Email"
                description={data.company.email}
                style="flex-grow"
              />
              <SpecCard
                title="Телефон"
                description={data.company.phone}
                style="flex-grow"
              />
              {data.company.address && (
                <SpecCard
                  title="Тип двигателя"
                  description={data.company.address}
                  style="flex-grow"
                />
              )}
            </View>
          </View>

          <View style={tw`gap-2`}>
            <Text style={tw`text-xl font-bold`}>Локация</Text>
            <LocationCard latLng={[data.lat, data.lon]} />
          </View>
        </View>
      </ScrollView>
      <View
        style={tw`flex-row justify-between items-center p-5 gap-2 bg-white`}
      >
        <Text style={tw`font-bold text-2xl flex-1`}>
          {data.price} KZT{' '}
          <Text style={tw`text-gray-500 font-normal text-xl`}>/ мин</Text>
        </Text>
        <Button style="flex-1" onPress={() => {}}>
          Заказать
        </Button>
      </View>
    </View>
  );
};
