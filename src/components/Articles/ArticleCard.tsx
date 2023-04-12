import tw from '@/config/twrnc';
import { Article } from '@/types/index';
import React, { FC } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type ArticleCardProps = Article & { onPress: () => void };

export const ArticleCard: FC<ArticleCardProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <View style={tw`w-full bg-white rounded-lg relative overflow-hidden`}>
        <Image
          source={{ uri: props.image_url }}
          style={tw`w-full aspect-video`}
        />
        <Text
          style={tw`text-white text-lg bg-black/10 p-4 absolute left-0 right-0 bottom-0 text-shadow`}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
