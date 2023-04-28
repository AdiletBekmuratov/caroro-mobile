import { Input } from '@/components/Forms';
import ListFooterLoader from '@/components/ListFooterLoader';
import { MakeCard } from '@/components/Makes';
import Spinner from '@/components/Spinner';
import tw from '@/config/twrnc';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import { findPaginatedMakes } from '@/utils/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { FC, useState } from 'react';
import { FlatList, View } from 'react-native';

export const MakesScreen: FC<HomeStackScreenProps<'MakesScreen'>> = ({
  navigation,
}) => {
  const [search, setSearch] = useState('');
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['makes', search],
      queryFn: ({ pageParam }) =>
        findPaginatedMakes({ page: pageParam, search, limit: 50 }),
      getNextPageParam: (lastPageData, allPagesData) =>
        lastPageData.meta?.currentPage !== lastPageData.meta.totalPages
          ? lastPageData.meta.currentPage + 1
          : undefined,
    });

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <View style={tw`p-5`}>
        <Input placeholder="Поиск" value={search} onChangeText={handleSearch} />
      </View>
      {isLoading && (
        <View style={tw`flex-grow relative`}>
          <Spinner />
        </View>
      )}
      <FlatList
        data={data?.pages.map(page => page.data).flat()}
        contentContainerStyle={tw`px-5 pb-5 gap-4`}
        initialNumToRender={10}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<ListFooterLoader visible={isFetchingNextPage} />}
        onMomentumScrollBegin={() => {
          setCallOnScrollEnd(false);
        }}
        onEndReached={() => {
          if (!callOnScrollEnd) {
            loadMore();
            setCallOnScrollEnd(true);
          }
        }}
        numColumns={2}
        renderItem={({ item, index }) => (
          <MakeCard
            style={`flex-1 ${index % 2 === 0 ? 'mr-2' : 'ml-2'}`}
            {...item}
            onPress={() =>
              navigation.navigate('VehiclesScreen', {
                filters: `&filter.makeId=$eq:${item.id}`,
                title: item.name,
              })
            }
          />
        )}
      />
    </View>
  );
};
