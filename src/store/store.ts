import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/MovieSlice";
import cartReducer from "../slices/CartSlice";
import rateReducer from "../slices/RateSlice";
import navBarReducer from "../slices/NavBarSlice";
import tokenReducer from "../slices/TokenSlice";
import { loginApi } from "../services/loginApi";
import { registerApi } from "../services/registerApi";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    cart: cartReducer,
    rate: rateReducer,
    navBar: navBarReducer,
    token: tokenReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, registerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
