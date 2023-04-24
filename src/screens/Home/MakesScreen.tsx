import { Input } from '@/components/Forms';
import ListFooterLoader from '@/components/ListFooterLoader';
import Spinner from '@/components/Spinner';
import tw from '@/config/twrnc';
import { useAppDispatch } from '@/redux/hooks';
import { API_URL } from '@/redux/http';
import { baseApi } from '@/redux/services/baseApi';
import { useGetCarBrandsQuery } from '@/redux/services/makes.service';
import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

export const MakesScreen = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
  const { data, isLoading, isFetching, refetch } = useGetCarBrandsQuery(
    `page=${page}&limit=50&search=${search}`,
  );

  const fetchNextPage = () => {
    if (data?.meta.currentPage < data?.meta.totalPages) {
      setPage(data?.meta.currentPage + 1);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    dispatch(baseApi.util.resetApiState());
    setPage(1);
    refetch();
  };

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <View style={tw`p-5`}>
        <Input
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={data?.data ?? []}
        contentContainerStyle={tw`px-5 pb-5 gap-4`}
        initialNumToRender={10}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<ListFooterLoader visible={isFetching} />}
        onMomentumScrollBegin={() => {
          setCallOnScrollEnd(false);
        }}
        onEndReached={() => {
          if (!callOnScrollEnd) {
            fetchNextPage();
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
