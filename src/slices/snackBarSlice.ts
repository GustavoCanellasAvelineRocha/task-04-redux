import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface navBarState {
  showSnackBarSuccess: boolean;
  SnackBarMessage: string;
}

const initialState: navBarState = {
  showSnackBarSuccess: false,
  SnackBarMessage: "",
};

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    showSnackbarSuccess: (state) => {
      state.showSnackBarSuccess = true;
    },
    dontShowSnackbarSuccess: (state) => {
      state.showSnackBarSuccess = false;
    },
    changeMessage: (state, action: PayloadAction<string>) => {
      state.SnackBarMessage = action.payload;
    },
  },
});

export const {
  showSnackbarSuccess,
  dontShowSnackbarSuccess,
  changeMessage,
} = snackBarSlice.actions;

export default snackBarSlice.reducer;
