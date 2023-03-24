import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

import { ArticlesStackParamList } from './articles.stack.type';
import { HomeStackParamList } from './home.stack.type';
import { ProfileStackParamList } from './profile.stack.type';

export type BottomTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ArticlesStack: NavigatorScreenParams<ArticlesStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
};

export type MainBottomTabsScreenProps<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends BottomTabParamList {}
  }
}
