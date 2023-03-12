import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { ProfileStackParamList } from './profile.stack.type';

export type BottomTabParamList = {
  HomeScreen: undefined;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainBottomTabsScreenProps<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;
