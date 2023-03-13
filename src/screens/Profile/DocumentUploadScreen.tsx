import { Button } from '@/components/Forms';
import { ProfileStackScreenProps } from '@/types/profile.stack.type';
import { FontAwesome } from '@expo/vector-icons/';
import * as ImagePicker from 'expo-image-picker';
import React, { FC, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
// import { Image } from 'expo-image';

export const DocumentUploadScreen: FC<
  ProfileStackScreenProps<'DocumentUploadScreen'>
> = ({ navigation }) => {
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
    <View style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <Text style={tw`text-xl text-center font-bold`}>
        Загрузка водительских прав
      </Text>
      <Text style={tw`text-center mb-5`}>
        После загрузки водительских прав пройдет модерация. При успешном
        результате Вам откроется доступ к аренде.
      </Text>
      {image ? (
        <View style={tw`flex-1 rounded-lg overflow-hidden`}>
          <Image source={{ uri: image }} style={tw`w-full h-full`} />
        </View>
      ) : (
        <TouchableOpacity style={tw`flex-grow`} onPress={pickImage}>
          <View
            style={tw`flex-1 bg-gray-300 rounded-lg items-center justify-center`}
          >
            <FontAwesome name={'upload'} color={`#9CA3AF`} size={40} />
          </View>
        </TouchableOpacity>
      )}
      <Button style="mt-5" onPress={() => navigation.goBack()}>
        Пропустить
      </Button>
    </View>
  );
};
