import { View, Text } from 'react-native';
import React, { FC } from 'react';
import tw from '@/config/twrnc';

type SpecCardProps = {
  title: string;
  description: string;
  style?: string;
};

export const SpecCard: FC<SpecCardProps> = ({
  description,
  title,
  style = '',
}) => {
  return (
    <View
      style={tw`bg-white rounded-lg p-2 min-w-40 ${style}`}
    >
      <Text style={tw`font-bold text-base`}>{title}</Text>
      <Text style={tw`text-base text-gray-500`}>{description}</Text>
    </View>
  );
};
