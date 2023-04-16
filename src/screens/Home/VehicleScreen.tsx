import React, { FC, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { Button } from '@/components/Forms';
import { ImageCarousel, SpecCard, LocationCard } from '@/components/Vehicles';
import tw from '@/config/twrnc';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import { FlatList } from 'react-native-gesture-handler';

const images = [
  {
    uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
  },
  {
    uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
  },
  {
    uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
  },
];

export const VehicleScreen: FC<HomeStackScreenProps<'VehicleScreen'>> = () => {
  const [visible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <ImageView
        images={images}
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
            data={images}
          />
        </View>
        <View style={tw`px-5 pb-5 gap-4`}>
          <View style={tw`gap-2`}>
            <Text style={tw`text-xl font-bold`}>Характеристики</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              directionalLockEnabled={true}
              alwaysBounceVertical={false}
            >
              <FlatList
                contentContainerStyle={tw`gap-2`}
                numColumns={Math.ceil(new Array(10).fill(0).length / 2)}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                columnWrapperStyle={tw`gap-2`}
                data={new Array(10).fill(0)}
                renderItem={({ item }) => (
                  <SpecCard title="Hello" description="World" />
                )}
              />
            </ScrollView>
          </View>

          <View style={tw`gap-2`}>
            <Text style={tw`text-xl font-bold`}>Локация</Text>
            <LocationCard latLng={[51.0759203, 71.39658065]} />
          </View>
        </View>
      </ScrollView>
      <View style={tw`flex-row justify-between items-center p-5 gap-2 bg-white`}>
        <Text style={tw`font-bold text-2xl flex-1`}>
          80 KZT{' '}
          <Text style={tw`text-gray-500 font-normal text-xl`}>/ час</Text>
        </Text>
        <Button style="flex-1" onPress={() => {}}>
          Заказать
        </Button>
      </View>
    </View>
  );
};
