import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import tw from 'twrnc';

type ArticleCardProps = {
  id: number;
  image: string;
  title: string;
};

export const ArticleCard: FC<ArticleCardProps> = ({ id, image, title }) => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={tw`w-full bg-white rounded-lg relative overflow-hidden`}>
        <Image source={{ uri: image }} style={tw`w-full aspect-video`} />
        <View style={tw`absolute inset-0 bg-black/10`}></View>
        <Text style={tw`absolute m-5 text-white text-lg bottom-0 left-0`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
