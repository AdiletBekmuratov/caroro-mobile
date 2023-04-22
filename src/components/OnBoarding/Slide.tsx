import { FC } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from 'react-native';

import tw from '@/config/twrnc';

const { width } = Dimensions.get('window');

type SlideProps = {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
};

export const Slide: FC<SlideProps> = item => {
  return (
    <View style={tw`items-center flex-1 w-full`}>
      <Image
        source={item.image}
        style={{ height: '75%', width: width - 40, resizeMode: 'contain' }}
      />
      <View style={tw`items-center`}>
        <Text style={tw`items-center mt-5 font-bold text-lg`}>
          {item.title}
        </Text>
        <Text style={tw`items-center mt-4`}>{item.subtitle}</Text>
      </View>
    </View>
  );
};
