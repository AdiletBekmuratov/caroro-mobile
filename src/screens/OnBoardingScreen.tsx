import { Footer, Slide } from '@/components/OnBoarding';
import tw from '@/config/twrnc';
import { slides } from '@/utils/slides';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>();
  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView style={tw`bg-gray-100 flex-1 p-5`}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide {...item} />}
      />
      <Footer
        currentSlideIndex={currentSlideIndex}
        pageRef={ref}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
