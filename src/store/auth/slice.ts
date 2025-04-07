import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './initialState';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user.token = action.payload;
    },
    logOut: (state) => {
      state.user.token = null;
    },
  },
});

export const { setToken, logOut } = authSlice.actions;

export default authSlice.reducer;
