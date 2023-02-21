import { Button, Input } from "@/components/Forms";
import { TextButton } from "@/components/Forms/TextButton";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const RegisterScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <Text style={tw`text-3xl font-bold mt-24`}>Давайте познакомимся!</Text>
      <Text style={tw`text-lg font-medium text-gray-500 mt-2`}>
        Создайте Ваш новый аккаунт
      </Text>
      <Input placeholder="Email" label="Email" style="mt-8" />
      <Input placeholder="Пароль" label="Пароль" style="mt-4" secureTextEntry />
      <Input
        placeholder="Подтверждение пароля"
        label="Подтверждение пароля"
        style="mt-4"
        secureTextEntry
      />
      <Button style="w-full mt-auto" onPress={() => {}}>
        Начать
      </Button>
      <TextButton
        containerStyle="mt-4"
        textStyle={`text-gray-500 text-center`}
        onPress={() => {}}
      >
        Уже есть аккаунт? <Text style={tw`font-bold text-black`}>Войти</Text>
      </TextButton>
    </SafeAreaView>
  );
};

export default RegisterScreen;
