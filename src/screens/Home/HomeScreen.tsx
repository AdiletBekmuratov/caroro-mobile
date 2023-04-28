import React, { FC } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import { TextButton } from '@/components/Forms';
import Spinner from '@/components/Spinner';
import { Card } from '@/components/Vehicles';
import tw from '@/config/twrnc';
import { useGetCarBrandsQuery } from '@/redux/services/makes.service';
import { useGetAllVehiclesQuery } from '@/redux/services/vehicles.service';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import { MakeCard } from '@/components/Makes';

export const HomeScreen: FC<HomeStackScreenProps<'HomeScreen'>> = ({
  navigation,
}) => {
  const { data: makeData, isLoading } = useGetCarBrandsQuery('page=1&limit=10');
  const { data: vehiclesData, isLoading: isLoadingVehicles } =
    useGetAllVehiclesQuery(
      'page=1&limit=10&filter.available=$eq:true&filter.enabled=$eq:true',
    );

  if (isLoading || isLoadingVehicles) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <ScrollView contentContainerStyle={tw`p-5 gap-5`}>
        <View style={tw`gap-2`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-3xl font-bold`}>Бренды</Text>
            <TextButton onPress={() => navigation.navigate('MakesScreen')}>
              Все
            </TextButton>
          </View>
          <View style={tw`flex-row`}>
            <FlatList
              data={makeData.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`gap-4`}
              renderItem={({ item, index }) => (
                <MakeCard
                  {...item}
                  style="w-36"
                  onPress={() =>
                    navigation.navigate('VehiclesScreen', {
                      filters: `&filter.makeId=$eq:${item.id}`,
                      title: item.name,
                    })
                  }
                />
              )}
            />
          </View>
        </View>

        <View style={tw`gap-2`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-3xl font-bold`}>Популярное</Text>
            <TextButton onPress={() => navigation.navigate('VehiclesScreen')}>
              Все
            </TextButton>
          </View>
          <View style={tw`gap-5`}>
            {vehiclesData.data.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
