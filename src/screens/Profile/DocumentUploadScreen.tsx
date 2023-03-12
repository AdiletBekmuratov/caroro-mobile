import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons/';
import tw from 'twrnc';
// import { Image } from 'expo-image';

export const DocumentUploadScreen = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    let localUri = result.assets[0].uri;
    let filename = localUri.split('/').pop();

    let formData = new FormData();
    formData.append('photo', localUri, filename);

    setImage(localUri);
  };
  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <Text style={tw`text-xl text-center font-bold mt-8`}>
        Загрузка водительских прав
      </Text>
      <Text style={tw`text-center mb-8`}>
        После загрузки водительских прав пройдет модерация. При успешном результате Вам откроется доступ к аренде.
      </Text>
      {image ? (
        <View style={tw`flex-1 rounded-lg overflow-hidden`}>
          <Image source={{ uri: image }} style={tw`w-full h-full`} />
        </View>
      ) : (
        <TouchableOpacity style={tw`flex-grow mt-4`} onPress={pickImage}>
          <View
            style={tw`flex-1 bg-gray-300 rounded-lg items-center justify-center`}
          >
            <FontAwesome name={'upload'} color={`#9CA3AF`} size={40} />
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
