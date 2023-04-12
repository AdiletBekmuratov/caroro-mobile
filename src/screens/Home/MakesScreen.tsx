import Spinner from '@/components/Spinner';
import tw from '@/config/twrnc';
import { API_URL } from '@/redux/http';
import { useGetCarBrandsQuery } from '@/redux/services/makes.service';
import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

export const MakesScreen = () => {
  const [page, setPage] = useState(1);
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);
  const { data, isLoading, isFetching } = useGetCarBrandsQuery(
    `page=${page}&limit=20`,
  );

  const fetchNextPage = () => {
    setPage(data.meta.currentPage + 1);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      {isFetching && <Spinner style="bg-transparent" pointerEvents="none" />}
      <FlatList
        data={data.data}
        contentContainerStyle={tw`p-5 gap-4`}
        initialNumToRender={10}
        onEndReachedThreshold={0.1}
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
              {/* <Text style={tw`font-bold text-xl text-blue-500`}>
                    +{item.num_models}
                  </Text> */}
            </View>
          </View>
        )}
      />
    </View>
  );
};
