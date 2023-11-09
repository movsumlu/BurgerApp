import { createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredientsItem } from "types/interfaces";
import { swapArrayElements } from "utils/helper";

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
      let updatedOrderList = [...state.orderList];

      if (!updatedOrderList.filter((item) => item.type === "bun").length) {
        updatedOrderList = [...state.orderList, ...action.payload];
      } else {
        updatedOrderList.splice(
          updatedOrderList.length - 1,
          0,
          ...action.payload
        );
      }

      return {
        ...state,
        orderList: updatedOrderList,
      };
    },
    addBuns(state, action) {
      let orderListWithoutBuns = [...state.orderList];
      orderListWithoutBuns = orderListWithoutBuns.filter(
        ({ type }) => type !== "bun"
      );

      return {
        ...state,
        orderList: [
          ...action.payload,
          ...orderListWithoutBuns,
          ...action.payload,
        ],
      };
    },
    replaceIngredient(state, action) {
      const { dragIndex, hoverIndex } = action.payload;

      let replacedOrderList = [...state.orderList];

      replacedOrderList = swapArrayElements(
        replacedOrderList,
        dragIndex,
        hoverIndex
      );

      return {
        ...state,
        orderList: replacedOrderList,
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

export const {
  addIngredient,
  addBuns,
  replaceIngredient,
  deleteIngredient,
  clearOrderList,
} = orderListSlice.actions;

export default orderListSlice.reducer;
