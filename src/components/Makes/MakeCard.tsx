import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';

import tw from '@/config/twrnc';
import { Make } from '@/types/index';
import { API_URL } from '@/redux/http';
import { onPressVibrate } from '@/utils/vibration';

type MakeCardProps = { style?: string; onPress: () => void } & Make;

export const MakeCard: FC<MakeCardProps> = ({ style, onPress, ...item }) => {
  return (
    <TouchableOpacity
      style={tw`bg-white px-4 py-2 items-center rounded-lg ${style}`}
      onPress={() => onPressVibrate(onPress)}
      activeOpacity={0.5}
    >
      <Image
        source={{
          uri: item.image,
        }}
        style={[tw`h-24 w-full`, { resizeMode: 'contain' }]}
      />

      <View style={tw`bg-white items-center`}>
        <Text style={tw`text-lg capitalize`}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
