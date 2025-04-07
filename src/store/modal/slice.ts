import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setModalObject: (state, action) => {
      state.objectData = action.payload;
    },
  },
});

export const { setIsOpen, setModalObject } = modalSlice.actions;

export default modalSlice.reducer;
