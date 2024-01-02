import { configureStore } from "@reduxjs/toolkit";

import ingredients from "store/ingredients/slice";
import order from "store/order/slice";
import orders from "store/orders/slice";
import profile from "store/profile/slice";

import { socketMiddleware } from "services/middlewares/socketMiddleware";

import * as wsActions from "store/orders/actions";

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: {
    ingredients,
    order,
    orders,
    profile,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
