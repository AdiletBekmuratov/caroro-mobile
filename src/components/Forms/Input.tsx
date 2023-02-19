import React, { FC, useState } from "react";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import tw from "twrnc";
import { onPressVibrate } from "@/utils/vibration";
import { IconButton } from "./IconButton";

interface IInputProps {
  label?: string;
  placeholder: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (
    text: string
  ) => void | ((masked: string, unmasked: string, obfuscated: string) => void);
  value?: string;
  isError?: boolean;
  errorText?: string;
  style?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  activeColor?: string;
}

export const Input: FC<IInputProps> = ({
  label = "",
  placeholder,
  onBlur,
  onChangeText,
  value,
  isError,
  errorText,
  style,
  secureTextEntry,
  keyboardType,
  activeColor,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [onFocus, setOnFocus] = useState(false);

  const handleTogglePassVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleOnBlur = (event) => {
    setOnFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <View style={tw`${style}`}>
      {label.length > 0 && <Text style={tw`mb-0.5 font-bold`}>{label}</Text>}
      <View
        style={tw`relative border ${
          activeColor && onFocus ? activeColor : "border-gray-200"
        } rounded-lg justify-center px-4 py-2`}
      >
        <TextInput
          keyboardType={keyboardType ?? "default"}
          secureTextEntry={secureTextEntry ? passwordVisible : false}
          style={tw`text-black ${secureTextEntry ? "pr-10" : ""}`}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => setOnFocus(true)}
        />

        {secureTextEntry && (
          <IconButton
            name={passwordVisible ? "eye" : "eye-slash"}
            style={`absolute right-0`}
            onPress={() => onPressVibrate(handleTogglePassVisibility)}
          />
        )}
      </View>

      {isError && <Text>{errorText}</Text>}
    </View>
  );
};
