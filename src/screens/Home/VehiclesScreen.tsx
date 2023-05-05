import { useInfiniteQuery } from '@tanstack/react-query';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { IconButton, Input } from '@/components/Forms';
import ListFooterLoader from '@/components/ListFooterLoader';
import Spinner from '@/components/Spinner';
import { Card, FilterByModal, OrderByModal } from '@/components/Vehicles';
import tw from '@/config/twrnc';
import { findPaginatedVehicles } from '@/utils/api';
import { HomeStackScreenProps } from '@/types/home.stack.type';
import {
  useFindAllEnginesQuery,
  useFindAllGaerBoxesQuery,
  useFindAllVehicleTypesQuery,
} from '@/redux/services/filter.service';

export const VehiclesScreen: FC<HomeStackScreenProps<'VehiclesScreen'>> = ({
  navigation,
  route,
}) => {
  const filterBySheet = useRef<BottomSheetModal>();
  const orderBySheet = useRef<BottomSheetModal>();

  useFindAllEnginesQuery();
  useFindAllGaerBoxesQuery();
  useFindAllVehicleTypesQuery();

  const [filterBy, setFilterBy] = useState('');
  const [orderBy, setOrderBy] = useState('&sortBy=createdAt:DESC');

  const [search, setSearch] = useState('');
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['vehicles', search, `${filterBy}${orderBy}`],
      queryFn: ({ pageParam }) =>
        findPaginatedVehicles({
          page: pageParam,
          search,
          limit: 50,
          query: `${route.params?.filters ?? ''}${filterBy}${orderBy}`,
        }),
      getNextPageParam: (lastPageData, allPagesData) =>
        lastPageData.meta?.currentPage !== lastPageData.meta.totalPages
          ? lastPageData.meta.currentPage + 1
          : undefined,
    });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={tw`flex-row items-center`}>
          <IconButton
            name="filter"
            iconset="MCI"
            color="black"
            size={20}
            onPress={() => filterBySheet.current.present()}
          />
          <IconButton
            name="sort-variant"
            iconset="MCI"
            color="black"
            size={20}
            onPress={() => orderBySheet.current.present()}
          />
        </View>
      ),
    });
  }, [navigation]);

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
        renderItem={({ item, index }) => <Card key={index} {...item} />}
      />
      <FilterByModal sheetRef={filterBySheet} setFilterBy={setFilterBy} />
      <OrderByModal
        sheetRef={orderBySheet}
        setOrderBy={setOrderBy}
        orderBy={orderBy}
      />
    </View>
  );
};
