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
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: CustomizationState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  navType: undefined,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
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
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    setSuccessMessage(state, action: PayloadAction<string | null>) {
      state.successMessage = action.payload;
    },
  },
});

export const {
  openMenu,
  setMenu,
  setFontFamily,
  setBorderRadius,
  setIsLoading,
  setErrorMessage,
  setSuccessMessage,
} = customizationSlice.actions;

export default customizationSlice.reducer;
