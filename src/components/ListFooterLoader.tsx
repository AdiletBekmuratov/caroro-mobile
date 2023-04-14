import React, { FC } from 'react';
import { View } from 'react-native';

import tw from '@/config/twrnc';
import Spinner from './Spinner';

type ListFooterLoaderProps = {
  visible: boolean;
};

const ListFooterLoader: FC<ListFooterLoaderProps> = ({ visible }) => {
  if (!visible) {
    return;
  }

  return (
    <View style={tw`relative h-16`}>
      <Spinner pointerEvents="none" />
    </View>
  );
};

export default ListFooterLoader;
