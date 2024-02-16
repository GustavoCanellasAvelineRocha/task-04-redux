import { PayloadAction, createSlice,  } from "@reduxjs/toolkit";
import { Movie } from "../utils/interfaces";

interface MoviesState {
  cart: Movie[];
  cartPrice: number
}

const initialState: MoviesState = {
  cart: [],
  cartPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartMovie: (state, action: PayloadAction<Movie>) => {
      state.cart.push(action.payload);
    },
    removeCartMovie: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((movie) => {
        return movie.id !== action.payload;
      });
    },
    totalCartPrice: (state) => {
      state.cartPrice = state.cart.reduce((total, movie) => {
        return total + movie.price;
      }, 0);
    },
  },
});

export const {
  addCartMovie,
  removeCartMovie,
  totalCartPrice,
} = cartSlice.actions;

export default cartSlice.reducer;
