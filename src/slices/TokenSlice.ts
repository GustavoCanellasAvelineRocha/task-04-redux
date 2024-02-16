import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface tokenState {
  token: string | null;
}

const initialState: tokenState = {
  token: localStorage.getItem("token"),
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    removeToken: (state) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
