import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mailReducer from './Slices/mailSlice';
import userReducer from "./Slices/userSlice";

export const store = configureStore({
  reducer: {
    mail: mailReducer,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
