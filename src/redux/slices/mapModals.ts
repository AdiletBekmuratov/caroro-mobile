import { MapModals } from '@/types/index';
import { createSlice } from '@reduxjs/toolkit';

const initialState: MapModals = {
  waitModalScreen: false,
};

export const mapModalsSlice = createSlice({
  name: 'mapModals',
  initialState,
  reducers: {
    openWaitModalScreen: state => {
      state.waitModalScreen = true;
    },
    closeAllMapModals: state => {
      state.waitModalScreen = false;
    },
  },
  extraReducers: () => {},
});

export const { closeAllMapModals, openWaitModalScreen } =
  mapModalsSlice.actions;
export default mapModalsSlice.reducer;
