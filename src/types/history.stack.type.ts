import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import {
  BottomTabParamList,
  MainBottomTabsScreenProps,
} from './bottom.tab.type';

export type HistoryStackParamList = {
  HistoryScreen: undefined;
};

export type HistoryStackScreenProps<T extends keyof HistoryStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HistoryStackParamList, T>,
    MainBottomTabsScreenProps<keyof BottomTabParamList>
  >;
