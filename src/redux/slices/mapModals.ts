import { MapModals } from '@/types/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: MapModals = {
  orderId: null,
  waitModalScreen: false,
};

export const mapModalsSlice = createSlice({
  name: 'mapModals',
  initialState,
  reducers: {
    openWaitModalScreen: (
      state,
      action: PayloadAction<{ orderId: number }>,
    ) => {
      state.waitModalScreen = true;
      state.orderId = action.payload.orderId;
    },
    closeAllMapModals: state => {
      state.orderId = null;
      state.waitModalScreen = false;
    },
  },
  extraReducers: () => {},
});

export const { closeAllMapModals, openWaitModalScreen } =
  mapModalsSlice.actions;
export default mapModalsSlice.reducer;
