import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../createStore';

const user = (state: RootState) => state.userSlice;

export const currentUserSelector = createSelector(user, (state) => state.user);
export const currentUserStateSelector = createSelector(
  user,
  (state) => state.status
);
export const currentUserErrorSelector = createSelector(
  user,
  (state) => state.error
);
