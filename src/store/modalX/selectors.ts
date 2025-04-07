import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../createStore';

const modalState = (state: RootState) => state.modalXSlice;
const isModalOpen = (state: RootState) => state.modalXSlice.isModalOpen;
const modalType = (state: RootState) => state.modalXSlice.type;
const modalProps = (state: RootState) => state.modalXSlice.props;

export const modalStateSelector = createSelector(modalState, (state) => state);
export const isModalOpenSelector = createSelector(
  isModalOpen,
  (state) => state
);

export const modalComponentSelector = createSelector(
  modalType,
  (state) => state
);
export const modalPropsSelector = createSelector(modalProps, (state) => state);
