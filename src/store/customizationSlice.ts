import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import config from 'config';

// ==============================|| CUSTOMIZATION SLICE ||============================== //

export interface CustomizationState {
  isOpen: string[];
  defaultId: string;
  fontFamily: string;
  borderRadius: number;
  opened: boolean;
  navType: string | undefined; // When is not undefined, it fails :s
}

const initialState: CustomizationState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  navType: undefined
};

const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    openMenu(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.isOpen = [id];
    },
    setMenu(state, action: PayloadAction<boolean>) {
      state.opened = action.payload;
    },
    setFontFamily(state, action: PayloadAction<string>) {
      state.fontFamily = action.payload;
    },
    setBorderRadius(state, action: PayloadAction<number>) {
      state.borderRadius = action.payload;
    },
  },
});

export const { openMenu, setMenu, setFontFamily, setBorderRadius } = customizationSlice.actions;

export default customizationSlice.reducer;
