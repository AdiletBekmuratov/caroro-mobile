import { View, Text, Image } from 'react-native';
import React, { FC } from 'react';
import tw from '@/config/twrnc';
import { Button } from '../Forms';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import { useNavigation } from '@react-navigation/native';

export const Card = () => {
  const navigation =
    useNavigation<HomeStackScreenProps<'HomeScreen'>['navigation']>();
  return (
    <View style={tw`flex-grow bg-white p-5 rounded-lg`}>
      <View style={tw`flex-row justify-between relative`}>
        <Text style={tw`text-2xl w-1/2`}>S 500 Sedan</Text>
      </View>
      <View style={tw`flex-row justify-center relative gap-2 mt-16`}>
        <Text style={tw`text-gray-600`}>Автомат</Text>
        <Text style={tw`text-gray-600`}>|</Text>
        <Text style={tw`text-gray-600`}>4 сидения</Text>
        <Text style={tw`text-gray-600`}>|</Text>
        <Text style={tw`text-gray-600`}>Бензин</Text>
      </View>
      <View style={tw`flex-row relative gap-2 mt-8 w-2/3 mx-auto`}>
        <Button
          mod="outlined"
          onPress={() =>
            navigation.navigate('VehicleScreen', {
              vehicle: { title: 'S 500 Sedan' },
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
      <Image
        source={{
          uri: 'https://purepng.com/public/uploads/large/51506279779c6rntanvyoznezpyppnhohayyxtzb1fw4pyobj8vrqyxl5jgyo0x8wqtg9rcqmi0ddeo5f0xplr20eua2fmf3maooz8epuincm94.png',
        }}
        style={[
          tw`w-56 aspect-video absolute right-0 -top-5`,
          {
            resizeMode: 'contain',
            transform: [{ rotateY: '180deg' }],
          },
        ]}
      />
    </View>
  );
};
