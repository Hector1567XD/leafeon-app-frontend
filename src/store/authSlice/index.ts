import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from 'services/auth/login';
import { AuthState } from './types';
import { hasStorageData } from './hasStorageData';
import { getStorageData } from './getStorageData';
import { setStorageData } from './setStorageData';
import { clearStorageData } from './clearStorageData';

const initialState: AuthState = hasStorageData() ? {
  ...getStorageData(),
  isAuth: true,
} : {
  user: null,
  token: null,
  isAuth: false,
};

console.log('initial,state', hasStorageData(), initialState);

export type LoginPayload = LoginResponse & { remember: boolean };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser(state, action: PayloadAction<LoginPayload>) {
      state.user = {
        email: action.payload.email,
        name: action.payload.name
      };
      state.token = action.payload.token;
      state.isAuth = true;
      if (action.payload.remember)
        setStorageData({
          user: {
            email: action.payload.email,
            name: action.payload.name
          },
          token: action.payload.token
        });
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      clearStorageData();
    }
  },
});

export const { logout, authUser } = authSlice.actions;

export default authSlice.reducer;
