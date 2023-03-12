import { Button } from '@/components/Forms';
import { useAppDispatch } from '@/redux/hooks';
import { API_URL } from '@/redux/http';
import { useGetCarBrandsQuery } from '@/redux/services/makes.service';
import { logout } from '@/redux/slices/auth';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const data = [
  {
    id: 1,
    image:
      'https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/819061b6-7d77-4e3b-96af-1075fb2de5cb/Bugatti%20Chiron%20Super%20Sport%20300%2B.jpeg?width=800&fm=jpg&auto=format',
    text: 'Placeholder',
    price: 200,
  },
  {
    id: 2,
    image:
      'https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/819061b6-7d77-4e3b-96af-1075fb2de5cb/Bugatti%20Chiron%20Super%20Sport%20300%2B.jpeg?width=800&fm=jpg&auto=format',
    text: 'Placeholder',
    price: 200,
  },
  {
    id: 3,
    image:
      'https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/819061b6-7d77-4e3b-96af-1075fb2de5cb/Bugatti%20Chiron%20Super%20Sport%20300%2B.jpeg?width=800&fm=jpg&auto=format',
    text: 'Placeholder',
    price: 200,
  },
];

const Demo = () => {
  const dispatch = useAppDispatch();
  const { data: carData = [] } = useGetCarBrandsQuery();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100`}>
      <View style={tw`h-36 w-full justify-center bg-white rounded-xl py-4`}>
        <Image
          source={{
            uri: 'https://t3.ftcdn.net/jpg/01/64/24/72/360_F_164247267_vbSG3hECAaGhMP4i7AHdFasVJOQwE4Az.jpg',
          }}
          style={tw`absolute inset-0 h-36 w-full rounded-xl`}
        />
        <View style={tw`p-5`}>
          <Text style={tw`text-white`}>Hello, Mr. Adilet</Text>
          <Text style={tw`text-white text-2xl font-semibold leading-tight`}>
            Let's start{'\n'}your Journey
          </Text>
        </View>
      </View>
      <Button onPress={handleLogout}>Exit</Button>

      <View style={tw`mt-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-3xl font-bold`}>Бренды</Text>
          <Text>Все</Text>
        </View>
        <View style={tw`flex-row`}>
          <FlatList
            data={carData.data}
            horizontal
            contentContainerStyle={tw`py-2`}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={tw`w-36 bg-white px-4 py-2 items-center rounded-lg ${
                  index !== 0 ? 'ml-4' : ''
                }`}
              >
                <Image
                  source={{
                    uri: item.image.replace(
                      'http://localhost:3333/api',
                      API_URL,
                    ),
                  }}
                  style={[tw`h-24 w-full`, { resizeMode: 'contain' }]}
                />

                <View style={tw`bg-white items-center`}>
                  <Text style={tw`text-lg capitalize`}>{item.name}</Text>
                  {/* <Text style={tw`font-bold text-xl text-blue-500`}>
                    +{item.num_models}
                  </Text> */}
                </View>
              </View>
            )}
          />
        </View>
      </View>

      <View style={tw`mt-4 flex-row`}>
        <FlatList
          data={data}
          horizontal
          contentContainerStyle={tw`py-2`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={tw`w-50 bg-white p-2 rounded ${index !== 0 ? 'ml-4' : ''}`}
            >
              <Image
                source={{ uri: item.image }}
                style={[tw`w-full h-28 rounded`]}
              />

              <View style={tw`bg-white mt-2`}>
                <Text style={tw`font-bold text-lg`}>{item.text}</Text>
                <Text style={tw`font-bold`}>${item.price}/day</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Demo;
