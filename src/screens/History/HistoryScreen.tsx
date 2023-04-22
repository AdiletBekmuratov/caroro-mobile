import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { HistoryCard } from '@/components/History';
import Spinner from '@/components/Spinner';
import tw from '@/config/twrnc';
import { useGetMyOrdersQuery } from '@/redux/services/order.service';
import { HistoryStackScreenProps } from '@/types/index';

export const HistoryScreen: FC<HistoryStackScreenProps<'HistoryScreen'>> = ({
  navigation,
}) => {
  const { data, isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ScrollView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <View style={tw``}>
        <View style={tw`pt-5 gap-5`}>
          {data.map((item, index) => (
            <HistoryCard key={index} {...item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
