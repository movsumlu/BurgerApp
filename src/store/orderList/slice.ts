import { createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredientsItem } from "types/interfaces";

interface IOrderListState {
  orderList: IBurgerIngredientsItem[];
}

const initialState: IOrderListState = {
  orderList: [],
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    addIngredient(state, action) {
      const updatedOrderList = [...state.orderList];
      updatedOrderList.splice(
        updatedOrderList.length - 1,
        0,
        ...action.payload
      );

      return {
        ...state,
        orderList: updatedOrderList,
      };
    },
    addBuns(state, action) {
      return {
        ...state,
        orderList: [...action.payload, ...state.orderList, ...action.payload],
      };
    },
    deleteIngredient(state, action) {
      const filteredOrderList = [...state.orderList];
      filteredOrderList.splice(action.payload, 1);

      return {
        ...state,
        orderList: filteredOrderList,
      };
    },
    clearOrderList(state) {
      return {
        ...state,
        orderList: [],
      };
    },
  },
});

export const { addIngredient, addBuns, deleteIngredient, clearOrderList } =
  orderListSlice.actions;

export default orderListSlice.reducer;
