import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from 'services/auth/login';

export interface AuthState {
  user: null | {
    email: string;
    name: string;
  },
  token: null | string;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authUser(state, action: PayloadAction<LoginResponse>) {
      state.user = {
        email: action.payload.email,
        name: action.payload.name
      };
      state.token = action.payload.token;
      state.isAuth = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;
    }
  },
});

export const { logout, authUser } = authSlice.actions;

export default authSlice.reducer;
