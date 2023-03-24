import MarkdownView from '@/components/MarkdownView';
import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export const ArticleScreen = () => {
  return (
    <View style={tw`flex-1 bg-gray-100 w-full`}>
      <MarkdownView style="w-full h-full" text="Hello world" />
    </View>
  );
};
