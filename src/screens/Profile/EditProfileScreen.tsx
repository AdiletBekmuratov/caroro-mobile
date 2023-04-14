import Spinner from '@/components/Spinner';
import React from 'react';
import { Text, View } from 'react-native';

import {
  useFindMeQuery,
  useUpdateProfileMutation,
} from '@/redux/services/profile.service';
import tw from '@/config/twrnc';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditProfileFormData,
  EditProfileSchema,
} from '@/types/edit-profile.screen.type';
import { Button, Input } from '@/components/Forms';
import { useAppDispatch } from '@/redux/hooks';
import { addMessage } from '@/redux/slices/message';

export const EditProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useFindMeQuery();
  const [updateMutate, { isLoading: isLoadingUpdate }] =
    useUpdateProfileMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
    },
  });
  const onSubmit = handleSubmit(data => {
    updateMutate(data).then(() => {
      dispatch(addMessage({ message: 'Профиль успешно обновлен!' }));
    });
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 bg-gray-100 w-full p-5`}>
      <View>
        <Controller
          control={control}
          name="firstname"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Имя"
              label="Имя"
              onBlur={onBlur}
              onChangeText={val => onChange(val.trim())}
              value={value}
              errorText={errors.firstname?.message}
              activeColor="border-gray-300"
            />
          )}
        />
        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Фамилия"
              label="Фамилия"
              onBlur={onBlur}
              onChangeText={val => onChange(val.trim())}
              value={value}
              errorText={errors.lastname?.message}
              activeColor="border-gray-300"
              style="mt-4"
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="+7 (___) ___ ____"
              label="Телефон"
              onBlur={onBlur}
              mask="+7 (999) 999 9999"
              onChangeText={val => onChange(val.trim())}
              value={value}
              errorText={errors.phone?.message}
              activeColor="border-gray-300"
              style="mt-4"
            />
          )}
        />
      </View>
      <View style={tw`flex-grow bg-gray-100 mt-4`}>
        <Button
          style="w-full mt-auto"
          onPress={onSubmit}
          disabled={isLoadingUpdate}
        >
          Обновить
        </Button>
      </View>
    </View>
  );
};
