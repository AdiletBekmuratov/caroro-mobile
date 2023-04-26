import MarkdownView from '@/components/MarkdownView';
import tw from '@/config/twrnc';
import { ArticlesStackScreenProps } from '@/types/articles.stack.type';
import React, { FC } from 'react';
import { Image, View } from 'react-native';

export const ArticleScreen: FC<ArticlesStackScreenProps<'ArticleScreen'>> = ({
  route,
}) => {
  const { article } = route.params;
  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <Image
        source={{ uri: article.image_url }}
        style={tw`w-full aspect-video`}
      />
      <MarkdownView style="flex-grow relative" text={article.body} />
    </View>
  );
};
