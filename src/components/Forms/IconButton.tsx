import { onPressVibrate } from '@/utils/vibration';
import { FontAwesome } from '@expo/vector-icons/';
import React, { ComponentProps, FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

type FontAwesomeName = ComponentProps<typeof FontAwesome>['name'];

interface IIconButtonProps {
  name: FontAwesomeName;
  onPress?: (event: GestureResponderEvent) => void;
  style?: string;
  disabled?: boolean;
  size?: number;
  color?: string;
}

export const IconButton: FC<IIconButtonProps> = ({
  name,
  onPress,
  style,
  disabled,
  size = 16,
  color = '#9CA3AF',
}) => {
  return (
    <TouchableOpacity
      style={tw`p-4 rounded-full ${style}`}
      onPress={() => onPressVibrate(onPress)}
      activeOpacity={0.5}
      disabled={disabled}
    >
      <FontAwesome name={name} color={color} size={size} />
    </TouchableOpacity>
  );
};
