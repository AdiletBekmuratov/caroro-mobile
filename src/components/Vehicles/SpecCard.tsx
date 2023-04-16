import { View, Text } from 'react-native';
import React, { FC } from 'react';
import tw from '@/config/twrnc';

type SpecCardProps = {
  title: string;
  description: string;
};

export const SpecCard: FC<SpecCardProps> = ({ description, title }) => {
  return (
    <View style={tw`border border-[0.5px] border-gray-500 rounded-lg p-2 w-40`}>
      <Text style={tw`font-bold text-base`}>{title}</Text>
      <Text style={tw`text-base text-gray-500`}>{description}</Text>
    </View>
  );
};
