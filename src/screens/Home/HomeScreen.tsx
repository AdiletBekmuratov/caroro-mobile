import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};
