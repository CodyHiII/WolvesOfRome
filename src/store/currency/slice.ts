import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
