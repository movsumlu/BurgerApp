import { configureStore } from "@reduxjs/toolkit";

import ingredients from "store/ingredients/slice";
import order from "store/order/slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: {
    ingredients,
    order,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
