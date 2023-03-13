import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { Input } from '@/components/Forms';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <Input
        placeholder="Phone"
        mask="+7 (999) 999 9999"
        keyboardType="phone-pad"
        onChangeText={text => {}}
      />
    </SafeAreaView>
  );
};
