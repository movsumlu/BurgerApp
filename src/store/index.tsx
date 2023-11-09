import { configureStore } from "@reduxjs/toolkit";

import ingredients from "store/ingredients/slice";
import orderList from "store/orderList/slice";
import modal from "store/modal/slice";

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: {
    ingredients,
    orderList,
    modal,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
