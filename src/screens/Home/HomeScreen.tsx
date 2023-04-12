import { TextButton } from '@/components/Forms';
import { API_URL } from '@/redux/http';
import { useGetCarBrandsQuery } from '@/redux/services/makes.service';
import React, { FC } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import tw from '@/config/twrnc';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import Spinner from '@/components/Spinner';

export const HomeScreen: FC<HomeStackScreenProps<'HomeScreen'>> = ({
  navigation,
}) => {
  const { data: carData, isLoading } = useGetCarBrandsQuery('page=1&limit=10');

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <View style={tw``}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-3xl font-bold`}>Бренды</Text>
          <TextButton onPress={() => navigation.navigate('MakesScreen')}>
            Все
          </TextButton>
        </View>
        <View style={tw`flex-row`}>
          <FlatList
            data={carData.data.slice(0, 10)}
            horizontal
            contentContainerStyle={tw`py-2`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={tw`w-36 bg-white px-4 py-2 items-center rounded-lg ${
                  index !== 0 ? 'ml-4' : ''
                }`}
              >
                <Image
                  source={{
                    uri: item.image.replace(
                      'http://localhost:3333/api',
                      API_URL,
                    ),
                  }}
                  style={[tw`h-24 w-full`, { resizeMode: 'contain' }]}
                />

                <View style={tw`bg-white items-center`}>
                  <Text style={tw`text-lg capitalize`}>{item.name}</Text>
                  {/* <Text style={tw`font-bold text-xl text-blue-500`}>
                    +{item.num_models}
                  </Text> */}
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};
