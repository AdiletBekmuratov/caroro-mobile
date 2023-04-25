import { Input } from '@/components/Forms';
import ListFooterLoader from '@/components/ListFooterLoader';
import tw from '@/config/twrnc';
import { API_URL } from '@/redux/http';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { findPaginatedMakes } from '@/utils/api';
import Spinner from '@/components/Spinner';

export const MakesScreen = () => {
  const [search, setSearch] = useState('');
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
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
        <Input
          placeholder="Поиск"
          value={search}
          onChangeText={handleSearch}
        />
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
          <View
            style={tw`flex-1 bg-white px-4 py-2 items-center rounded-lg ${
              index % 2 !== 0 ? 'ml-4' : ''
            }`}
          >
            <Image
              source={{
                uri: item.image.replace('http://localhost:3333/api', API_URL),
              }}
              style={[tw`w-full aspect-video`, { resizeMode: 'contain' }]}
            />

            <View style={tw`bg-white items-center`}>
              <Text style={tw`text-lg capitalize`}>{item.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
