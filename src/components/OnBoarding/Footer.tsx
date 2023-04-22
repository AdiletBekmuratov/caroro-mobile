import { Dispatch, FC, MutableRefObject, SetStateAction } from 'react';
import { Dimensions, FlatList, View } from 'react-native';

import tw from '@/config/twrnc';
import { slides } from '@/utils/slides';
import { Button } from '../Forms';
import { useAppDispatch } from '@/redux/hooks';
import { setFirstTime } from '@/redux/slices/settings';

const { width, height } = Dimensions.get('window');

type FooterProps = {
  currentSlideIndex: number;
  setCurrentSlideIndex: Dispatch<SetStateAction<number>>;
  pageRef: MutableRefObject<FlatList>;
};

export const Footer: FC<FooterProps> = ({
  currentSlideIndex,
  setCurrentSlideIndex,
  pageRef,
}) => {
  const dispatch = useAppDispatch();

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      pageRef?.current.scrollToIndex({ index: nextSlideIndex });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    dispatch(setFirstTime(false));
  };

  return (
    <View
      style={{
        height: height * 0.25,
        justifyContent: 'space-between',
      }}
    >
      {/* Indicator container */}
      <View style={tw`flex-row justify-center items-center mt-5`}>
        {/* Render indicator */}
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              tw`h-1 w-4 bg-gray-300 mx-1 rounded`,
              currentSlideIndex === index && tw`w-6 bg-black`,
            ]}
          />
        ))}
      </View>

      {/* Render buttons */}
      <View style={tw`flex-row`}>
        {currentSlideIndex == slides.length - 1 ? (
          <Button style="flex-1" onPress={skip}>
            Начать
          </Button>
        ) : (
          <>
            <Button mod="outlined" style="flex-1" onPress={skip}>
              Пропустить
            </Button>
            <View style={tw`w-2`} />
            <Button style="flex-1" onPress={goToNextSlide}>
              Следующий
            </Button>
          </>
        )}
      </View>
    </View>
  );
};
