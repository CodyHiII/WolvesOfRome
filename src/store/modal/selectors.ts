import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../createStore';

const modal = (state: RootState) => state.modalSlice;

export const isOpenSelector = createSelector(modal, (state) => state.isOpen);
export const getModalObject = createSelector(
  modal,
  (state) => state.objectData
);
