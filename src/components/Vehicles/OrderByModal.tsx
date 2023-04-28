import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useMemo,
} from 'react';
import { Text, View } from 'react-native';

import tw from '@/config/twrnc';
import { RadioGroup } from '../Forms';

interface OrderByModalProps {
  sheetRef?: MutableRefObject<BottomSheetModal>;
  setOrderBy: Dispatch<SetStateAction<string>>;
  orderBy: string;
}

export const OrderByModal: FC<OrderByModalProps> = ({
  sheetRef,
  setOrderBy,
  orderBy,
}) => {
  const snapPoints = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  function onChangeRadioGroup(text: string) {
    setOrderBy(text);
  }

  return (
    <BottomSheetModal
      index={0}
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={tw`p-5 flex-1`}>
        <View style={tw`mb-6`}>
          <Text style={tw`text-xl font-medium`}>Сортировка</Text>
        </View>
        <RadioGroup
          onChange={onChangeRadioGroup}
          active={orderBy}
          options={[
            {
              id: '1',
              label: 'Новинки',
              value: '&sortBy=createdAt:DESC',
            },
            {
              id: '2',
              label: 'Сначала дешевые',
              value: '&sortBy=price:ASC',
            },
            {
              id: '3',
              label: 'Сначала дорогие',
              value: '&sortBy=price:DESC',
            },
          ]}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};
