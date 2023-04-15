import { View, ScrollView, Image, Text } from 'react-native';
import React, { FC, useState } from 'react';
import ImageView from 'react-native-image-viewing';

import tw from '@/config/twrnc';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import { ImageCarousel } from '@/components/Vehicles';
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
      <View style={tw`bg-white rounded-b-3xl`}>
        <ImageCarousel
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setVisible={setIsVisible}
          data={images}
        />
      </View>
      <ScrollView contentContainerStyle={tw`p-5 gap-24`}>
        <Text style={tw`text-gray-600`}>Автомат</Text>
        <Text style={tw`text-gray-600`}>|</Text>
        <Text style={tw`text-gray-600`}>4 сидения</Text>
        <Text style={tw`text-gray-600`}>|</Text>
        <Text style={tw`text-gray-600`}>Бензин</Text>
      </ScrollView>
    </View>
  );
};
