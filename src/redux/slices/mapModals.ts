import { MapModals } from '@/types/index';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: MapModals = {
  orderId: null,
  pendingModalScreen: false,
  inprogressModalScreen: false,
};

export const mapModalsSlice = createSlice({
  name: 'mapModals',
  initialState,
  reducers: {
    openPendingModalScreen: (
      state,
      action: PayloadAction<{ orderId: number }>,
    ) => {
      state.pendingModalScreen = true;
      state.orderId = action.payload.orderId;
    },
    openInProgressModalScreen: (
      state,
      action: PayloadAction<{ orderId: number }>,
    ) => {
      state.inprogressModalScreen = true;
      state.orderId = action.payload.orderId;
    },
    closePendingMapModalScreens: state => {
      state.orderId = null;
      state.pendingModalScreen = false;
    },
    closeInProgressMapModalScreens: state => {
      state.orderId = null;
      state.inprogressModalScreen = false;
    },
    closeAllMapModals: state => {
      state.orderId = null;
      state.pendingModalScreen = false;
      state.inprogressModalScreen = false;
    },
  },
  extraReducers: () => {},
});

export const {
  closeInProgressMapModalScreens,
  closePendingMapModalScreens,
  closeAllMapModals,
  openPendingModalScreen,
  openInProgressModalScreen,
} = mapModalsSlice.actions;
export default mapModalsSlice.reducer;
