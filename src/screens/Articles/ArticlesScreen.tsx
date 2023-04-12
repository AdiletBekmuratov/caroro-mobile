import { ArticleCard } from '@/components/Articles';
import Spinner from '@/components/Spinner';
import tw from '@/config/twrnc';
import { useFindAllArticlesQuery } from '@/redux/services/articles.service';
import { ArticlesStackScreenProps } from '@/types/articles.stack.type';
import React, { FC } from 'react';
import { FlatList, View } from 'react-native';

export const ArticlesScreen: FC<ArticlesStackScreenProps<'ArticlesScreen'>> = ({
  navigation,
}) => {
  const {
    data = [],
    refetch,
    isFetching,
    isLoading,
  } = useFindAllArticlesQuery();

  const onRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <FlatList
        data={data}
        onRefresh={onRefresh}
        refreshing={isFetching}
        contentContainerStyle={tw`p-5 gap-5`}
        renderItem={({ item }) => (
          <ArticleCard
            {...item}
            onPress={() =>
              navigation.navigate('ArticleScreen', { article: item })
            }
          />
        )}
      />
    </View>
  );
};
