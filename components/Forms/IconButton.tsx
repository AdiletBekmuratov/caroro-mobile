import { onPressVibrate } from "@/utils/vibration";
import React, { ComponentProps, FC, ReactNode } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons/";

type FontAwesomeName = ComponentProps<typeof FontAwesome>["name"];

interface IIconButtonProps {
  name: FontAwesomeName;
  onPress?: (event: GestureResponderEvent) => void;
  style?: string;
  disabled?: boolean;
}

export const IconButton: FC<IIconButtonProps> = ({
  name,
  onPress,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={tw`p-4 rounded-full ${style}`}
      onPress={() => onPressVibrate(onPress)}
      activeOpacity={0.5}
      disabled={disabled}
    >
      <FontAwesome name={name} color={`#9CA3AF`} size={16} />
    </TouchableOpacity>
  );
};
