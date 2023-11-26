import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './phone.reducer';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});
