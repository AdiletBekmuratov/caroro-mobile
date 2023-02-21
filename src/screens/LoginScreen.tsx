import { Button, Input } from "@/components/Forms";
import { TextButton } from "@/components/Forms/TextButton";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useToggle } from "../hooks";

const LoginScreen = () => {
  const [forgotVisible, toggleForgotVisible] = useToggle(false);

  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <Text style={tw`text-3xl font-bold mt-24`}>Добро пожаловать!</Text>
      <Text style={tw`text-lg font-medium text-gray-500 mt-2`}>
        Войдите в Ваш аккаунт
      </Text>
      <Input placeholder="Email" label="Email" style="mt-8" />
      <Input placeholder="Пароль" label="Пароль" style="mt-4" secureTextEntry />
      <TextButton
        containerStyle="mt-4"
        textStyle={`font-bold text-right`}
        onPress={() => toggleForgotVisible()}
      >
        Забыли пароль?
      </TextButton>
      <Button style="w-full mt-auto" onPress={() => {}}>
        Отправить
      </Button>
      <TextButton
        containerStyle="mt-4"
        textStyle={`text-gray-500 text-center`}
        onPress={() => {}}
      >
        Еще нет аккаунта? <Text style={tw`font-bold text-black`}>Зарегистрироваться</Text>
      </TextButton>
      <Modal
        visible={forgotVisible}
        label="Восстановление"
        text="Введите ваш Email для получения ссылки для восстановления"
        okAction={() => console.log("OK")}
        cancelAction={() => toggleForgotVisible()}
        okText="Войти"
      >
        <Input placeholder="Email" style="mt-4" />
      </Modal>
    </SafeAreaView>
  );
};

export default LoginScreen;
