import { Footer, Slide } from '@/components/OnBoarding';
import tw from '@/config/twrnc';
import { slides } from '@/utils/slides';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  return (
    <SafeAreaView style={tw`bg-gray-100 flex-1 p-5`}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide {...item} />}
      />
      <Footer
        currentSlideIndex={currentSlideIndex}
        ref={ref}
        setCurrentSlideIndex={setCurrentSlideIndex}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;