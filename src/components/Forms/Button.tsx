import tw from '@/config/twrnc';
import { onPressVibrate } from '@/utils/vibration';
import React, { FC, ReactNode } from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface IButtonProps {
  children?: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  style?: string;
  disabled?: boolean;
  loading?: boolean;
  customChildren?: boolean;
}

export const Button: FC<IButtonProps> = ({
  children,
  onPress,
  style,
  disabled,
  loading,
  customChildren,
}) => {
  if (disabled || loading) {
    return (
      <View
        style={tw`flex flex-row p-4 bg-gray-200 rounded-lg items-center ${style}`}
      >
        {loading && <ActivityIndicator color="gray" size={16} />}
        {customChildren ? (
          children
        ) : (
          <Text style={tw`text-gray-400 ${loading ? 'ml-2' : ''}`}>
            {children}
          </Text>
        )}
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={tw`p-4 rounded-lg bg-black items-center ${style}`}
      onPress={() => onPressVibrate(onPress)}
      activeOpacity={0.5}
      disabled={disabled}
    >
      {customChildren ? (
        children
      ) : (
        <Text style={tw`text-white`}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};
