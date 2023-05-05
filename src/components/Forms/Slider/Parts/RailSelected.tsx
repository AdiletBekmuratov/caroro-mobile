import tw from '@/config/twrnc';
import React, { memo } from 'react';
import { View } from 'react-native';

const RailSelected = () => {
  return <View style={tw`h-1 bg-gray-400 rounded-full`} />;
};

export default memo(RailSelected);
