import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';

export interface MailState {
  sendMessageIsOpen: boolean;
  selectedMail: any;
}

const initialState: MailState = {
  sendMessageIsOpen: false,
  selectedMail: null
};

export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    selectMail: (state, action) => {
      state.selectedMail = action.payload;
    },
  }
});

export const { openSendMessage, closeSendMessage, selectMail } = mailSlice.actions;

export const selectSendMessageIsOpen = (state: RootState) => state.mail.sendMessageIsOpen;
export const selectOpenMail = (state: RootState) => state.mail.selectedMail;

export default mailSlice.reducer;