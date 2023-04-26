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
import { Text } from 'react-native';
import tw from 'twrnc';

import { useAppDispatch } from '@/redux/hooks';

interface IReportModal {
  sheetRef?: MutableRefObject<BottomSheetModal>;
  setSortBy: Dispatch<SetStateAction<string>>;
}

export const ReportModal: FC<IReportModal> = ({ sheetRef, setSortBy }) => {
  const dispatch = useAppDispatch();
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

  return (
    <BottomSheetModal
      detached
      index={0}
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={tw`p-4 flex-1`}>
        <Text>Hello</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
