import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Rate } from "../utils/interfaces";

interface RateState {
  rates: Rate[];
}

const initialState: RateState = {
  rates: [],
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    addRateMovie: (state, action: PayloadAction<Rate>) => {
      state.rates.push(action.payload);
    },
    removeRateMovie: (state, action: PayloadAction<number>) => {
      state.rates = state.rates.filter((rate) => {
        return rate.id !== action.payload;
      });
    },
  },
});

export const { addRateMovie, removeRateMovie } = rateSlice.actions;

export default rateSlice.reducer;
