import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { Button, Input, TextButton } from '@/components/Forms';
import {
  AuthStackScreenProps,
  RegisterFormData,
  RegisterSchema,
} from '@/types/index';
import { useAppDispatch } from '@/redux/hooks';
import { register } from '@/redux/slices/auth';

export const RegisterScreen: FC<AuthStackScreenProps<'RegisterScreen'>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirm: '',
    },
  });
  const onSubmit = (data: RegisterFormData) => {
    dispatch(register(data));
  };

  return (
    <SafeAreaView style={tw`flex-1 p-5 bg-gray-100 w-full`}>
      <Text style={tw`text-3xl font-bold mt-12`}>Давайте познакомимся!</Text>
      <Text style={tw`text-lg font-medium text-gray-500 mt-2`}>
        Создайте Ваш новый аккаунт
      </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            label="Email"
            onBlur={onBlur}
            onChangeText={val => onChange(val.trim())}
            value={value}
            errorText={errors.email?.message}
            activeColor="border-gray-300"
            style="mt-8"
          />
        )}
      />
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Имя пользователя"
            label="Имя пользователя"
            onBlur={onBlur}
            onChangeText={val => onChange(val.trim())}
            value={value}
            errorText={errors.username?.message}
            activeColor="border-gray-300"
            style="mt-4"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Пароль"
            label="Пароль"
            style="mt-4"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorText={errors.password?.message}
            activeColor="border-gray-300"
          />
        )}
      />
      <Controller
        control={control}
        name="confirm"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Подтверждение пароля"
            label="Подтверждение пароля"
            style="mt-4"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            errorText={errors.confirm?.message}
            activeColor="border-gray-300"
          />
        )}
      />

      <View style={tw`flex-grow bg-gray-100 mt-4`}>
        <Button style="w-full mt-auto" onPress={handleSubmit(onSubmit)}>
          Начать
        </Button>
        <TextButton
          containerStyle="mt-4"
          textStyle={`text-gray-500 text-center`}
          onPress={() => navigation.replace('LoginScreen')}
        >
          Уже есть аккаунт? <Text style={tw`font-bold text-black`}>Войти</Text>
        </TextButton>
      </View>
    </SafeAreaView>
  );
};
