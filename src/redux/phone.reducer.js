import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://656387b3ee04015769a75857.mockapi.io/contacts/`
      );
      console.log('data:', data);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkApi) => {
    try {
      const { data } = await axios.post(
        `https://656387b3ee04015769a75857.mockapi.io/contacts/`,
        contact
      );
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const fetchDeleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `https://656387b3ee04015769a75857.mockapi.io/contacts/${contactId}`
      );
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filterInput: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filterContact(state, { payload }) {
      state.filterInput = payload;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchAllContacts.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
      })
      .addCase(fetchAddContact.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addCase(fetchDeleteContact.fulfilled, (state, { payload }) => {
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== payload.id
        );
      })

      .addMatcher(
        isAnyOf(
          fetchAllContacts.fulfilled,
          fetchDeleteContact.fulfilled,
          fetchAddContact.fulfilled
        ),
        state => {
          state.contacts.isLoading = false;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllContacts.pending,
          fetchDeleteContact.pending,
          fetchAddContact.pending
        ),
        state => {
          state.contacts.isLoading = true;
          state.contacts.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllContacts.rejected,
          fetchDeleteContact.rejected,
          fetchAddContact.rejected
        ),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      ),
});

export const { filterContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
