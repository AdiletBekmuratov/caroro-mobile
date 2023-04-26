import React, { FC } from 'react';
import { FlatList, View } from 'react-native';

import { HistoryCard } from '@/components/History';
import Spinner from '@/components/Spinner';
import tw from '@/config/twrnc';
import { useGetMyOrdersQuery } from '@/redux/services/order.service';
import { HistoryStackScreenProps } from '@/types/index';

export const HistoryScreen: FC<HistoryStackScreenProps<'HistoryScreen'>> = ({
  navigation,
}) => {
  const { data = [], isLoading } = useGetMyOrdersQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`p-5 gap-5`}
        data={data}
        renderItem={({ item, index }) => <HistoryCard {...item} />}
      />
    </View>
  );
};
