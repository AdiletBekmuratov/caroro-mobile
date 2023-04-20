import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import tw from '@/config/twrnc';
import { ImageSource } from 'expo-image';

type ImageCarouselProps = {
  data: ImageSource[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  height: number;
  width: number;
  imageStyle?: string;
  style?: string;
  buttonStyle?: string;
};

export const ImageCarousel: FC<ImageCarouselProps> = ({
  data,
  currentIndex,
  setCurrentIndex,
  setVisible,
  height,
  width,
  imageStyle = '',
  style = '',
  buttonStyle = '',
}) => {
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  const handlePress = () => {
    if (setVisible) {
      setVisible(true);
    }
  };

  return (
    <View style={tw`relative bg-white`}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        bounces={false}
        decelerationRate={0}
        snapToInterval={width}
        contentContainerStyle={tw`${style}`}
        snapToAlignment="start"
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handlePress}
            style={tw`${buttonStyle}`}
          >
            <Image
              source={item}
              style={[
                {
                  width,
                  height,
                  resizeMode: 'cover',
                },
                tw`${imageStyle}`,
              ]}
            />
          </TouchableOpacity>
        )}
      />
      <View
        style={tw`flex-row justify-center items-center mt-5 absolute bottom-5 left-0 right-0 z-50`}
      >
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              tw`h-1 w-4 bg-white/50 mx-1 rounded`,
              currentIndex === index && tw`w-6 bg-white`,
            ]}
          />
        ))}
      </View>
    </View>
  );
};
