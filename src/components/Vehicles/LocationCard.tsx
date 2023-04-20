import { View, Text } from 'react-native';
import React, { FC } from 'react';
import tw from '@/config/twrnc';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetAddressFromLatLngQuery } from '@/redux/services/osm.service';
import Spinner from '../Spinner';

type LocationCardProps = {
  latLng: [number, number];
};

export const LocationCard: FC<LocationCardProps> = ({ latLng }) => {
  const { data, isLoading } = useGetAddressFromLatLngQuery({
    latLng,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`bg-white flex-row items-center gap-2 rounded-lg p-2`}>
      <MaterialCommunityIcons name="map-marker-outline" style={tw`text-2xl`} />
      <Text style={tw`text-base text-gray-500 flex-shrink`}>
        {data.display_name}
      </Text>
    </View>
  );
};
