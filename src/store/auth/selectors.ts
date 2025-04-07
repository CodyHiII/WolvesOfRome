import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../createStore';

const auth = (state: RootState) => state.authSlice;

export const userTokenSelector = createSelector(
  auth,
  (state) => state.user.token
);
