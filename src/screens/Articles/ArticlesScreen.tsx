import { ArticleCard } from '@/components/Articles';
import React from 'react';
import { FlatList, View } from 'react-native';
import tw from 'twrnc';

const TEMP_DATA = [
  {
    id: 1,
    image: 'https://source.unsplash.com/random/',
    title: 'Title',
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/random/',
    title: 'Title',
  },
  {
    id: 3,
    image: 'https://source.unsplash.com/random/',
    title: 'Title',
  },
  {
    id: 4,
    image: 'https://source.unsplash.com/random/',
    title: 'Title',
  },
];

export const ArticlesScreen = () => {
  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <FlatList
        data={TEMP_DATA}
        contentContainerStyle={tw`p-5 gap-5`}
        renderItem={({ item }) => <ArticleCard {...item} />}
      />
    </View>
  );
};
