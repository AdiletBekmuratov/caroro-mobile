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
  useState,
} from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

import { Button, Picker, Slider } from '../Forms';
import {
  useFindAllEnginesQuery,
  useFindAllGaerBoxesQuery,
  useFindAllVehicleTypesQuery,
} from '@/redux/services/filter.service';

interface FilterByModalProps {
  sheetRef?: MutableRefObject<BottomSheetModal>;
  setFilterBy: Dispatch<SetStateAction<string>>;
}
export const FilterByModal: FC<FilterByModalProps> = ({
  sheetRef,
  setFilterBy,
}) => {
  const { data: engines = [] } = useFindAllEnginesQuery();
  const { data: gearboxes = [] } = useFindAllGaerBoxesQuery();
  const { data: vehicleTypes = [] } = useFindAllVehicleTypesQuery();

  const snapPoints = useMemo(() => ['60%'], []);

  const [price, setPrice] = useState([0, 1000]);
  const [engine, setEngine] = useState<number>();
  const [gearbox, setGearbox] = useState<number>();
  const [vehicleType, setVehicleType] = useState<number>();

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

  const handleFilter = () => {
    setFilterBy(
      `&filter.price=$btw:${price[0]},${price[1]}${
        engine ? `&filter.engineId=$eq:${engine}` : ''
      }${vehicleType ? `&filter.vehicleTypeId=$eq:${vehicleType}` : ''}${
        gearbox ? `&filter.gearboxId=$eq:${gearbox}` : ''
      }`,
    );
  };

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
          <Text style={tw`text-xl font-medium`}>Фильтр</Text>
        </View>
        <View style={tw`gap-4 flex-grow`}>
          <Slider
            label="Цена"
            min={10}
            max={1000}
            step={1}
            setValue={setPrice}
          />
          <Picker
            data={engines}
            defaultValue={engines.find(item => engine == item.id)}
            onSelect={item => setEngine(item.id)}
            defaultButtonText="Выбрать тип двигателя"
            buttonTextAfterSelection="name"
            rowTextForSelection="name"
          />
          <Picker
            data={vehicleTypes}
            defaultValue={vehicleTypes.find(item => vehicleType == item.id)}
            onSelect={item => setVehicleType(item.id)}
            defaultButtonText="Выбрать тип кузова"
            buttonTextAfterSelection="name"
            rowTextForSelection="name"
          />
          <Picker
            data={gearboxes}
            defaultValue={gearboxes.find(item => gearbox == item.id)}
            onSelect={item => setGearbox(item.id)}
            defaultButtonText="Выбрать КПП"
            buttonTextAfterSelection="name"
            rowTextForSelection="name"
          />
        </View>
        <Button onPress={handleFilter}>Использовать</Button>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
