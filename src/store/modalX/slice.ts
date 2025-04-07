import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

const modalSlice = createSlice({
  name: 'modalX',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.type = action.payload.type;
      state.props = action.payload.props;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.type = null;
      state.props = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
