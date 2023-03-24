import { onPressVibrate } from '@/utils/vibration';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { ComponentProps, FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

type FontAwesomeName = ComponentProps<typeof FontAwesome>['name'];
type MaterialCommunityIconsName = ComponentProps<
  typeof MaterialCommunityIcons
>['name'];

type IconButtonProps =
  | {
      name: MaterialCommunityIconsName;
      onPress?: (event: GestureResponderEvent) => void;
      style?: string;
      disabled?: boolean;
      size?: number;
      color?: string;
      iconset?: 'MCI';
    }
  | {
      name: FontAwesomeName;
      onPress?: (event: GestureResponderEvent) => void;
      style?: string;
      disabled?: boolean;
      size?: number;
      color?: string;
      iconset?: 'FA';
    };

export const IconButton: FC<IconButtonProps> = ({
  name,
  onPress,
  style,
  disabled,
  size = 16,
  color = '#9CA3AF',
  iconset = 'FA',
}) => {
  const getCorrectComponent = () => {
    switch (iconset) {
      case 'MCI':
        return (
          <MaterialCommunityIcons
            name={name as MaterialCommunityIconsName}
            color={color}
            size={size}
          />
        );
      default:
        return (
          <FontAwesome
            name={name as FontAwesomeName}
            color={color}
            size={size}
          />
        );
    }
  };

  return (
    <TouchableOpacity
      style={tw`p-4 rounded-full ${style}`}
      onPress={() => onPressVibrate(onPress)}
      activeOpacity={0.5}
      disabled={disabled}
    >
      {getCorrectComponent()}
    </TouchableOpacity>
  );
};
