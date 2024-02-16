import { createSlice } from "@reduxjs/toolkit";

interface navBarState {
  showOptions: boolean;
}

const initialState: navBarState = {
  showOptions: false,
};

export const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    showOptions: (state) => {
      state.showOptions = true;
    },
    dontShowOptions: (state) => {
      state.showOptions = false;
    },
  },
});

export const { showOptions, dontShowOptions } = navBarSlice.actions;

export default navBarSlice.reducer;
