import { combineReducers, configureStore } from '@reduxjs/toolkit';
import customizationReducer from './customizationSlice';
import authReducer from './authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// ==============================|| REDUX - MAIN STORE ||============================== //

const rootReducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer,
});

const store = configureStore({ reducer: rootReducer });

// TypeScript helpers.
// See https://redux-toolkit.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// Strongly typed useDispatch and useSelector hooks with our store type definitions.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppMiddlewareGetState = () => RootState;
export type AppReduxMiddleware = (
  dispatch: AppDispatch,
  getState: () => RootState,
) => void | Promise<void>;

export default store;
