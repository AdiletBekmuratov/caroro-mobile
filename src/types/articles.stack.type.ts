import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  BottomTabParamList,
  MainBottomTabsScreenProps,
} from './bottom.tab.type';

export type ArticlesStackParamList = {
  ArticlesScreen: undefined;
  ArticleScreen: undefined;
};

export type ArticlesStackScreenProps<T extends keyof ArticlesStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<ArticlesStackParamList, T>,
    MainBottomTabsScreenProps<keyof BottomTabParamList>
  >;
