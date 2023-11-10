import { createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredientsItem } from "types/interfaces";
import { swapArrayElements } from "utils/helper";
import { checkoutOrder } from "./asyncThunks";

interface IOrderState {
  orderList: IBurgerIngredientsItem[];
  order: {
    number: number;
  } | null;
  showOrderModal: boolean;
  loading: boolean;
  errors: any;
}

const initialState: IOrderState = {
  orderList: [],
  order: null,
  showOrderModal: false,
  loading: false,
  errors: null,
};

const orderSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    addIngredient(state, action) {
      const hasBun = state.orderList.some((item) => item.type === "bun");

      const updatedOrderList = hasBun
        ? [
            ...state.orderList.slice(0, state.orderList.length - 1),
            ...action.payload,
            state.orderList[state.orderList.length - 1],
          ]
        : [...state.orderList, ...action.payload];

      return {
        ...state,
        orderList: updatedOrderList,
      };
    },
    addBuns(state, action) {
      const orderListWithoutBuns = [...state.orderList].filter(
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

      const replacedOrderList = swapArrayElements(
        [...state.orderList],
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
    displayOrderModal(state) {
      return {
        ...state,
        showOrderModal: true,
      };
    },
    hideOrderModal(state) {
      return {
        ...state,
        showOrderModal: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkoutOrder.pending, (state: IOrderState) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(checkoutOrder.fulfilled, (state, action) => {
      return {
        ...state,
        order: action.payload,
        loading: false,
      };
    });

    builder.addCase(checkoutOrder.rejected, (state: IOrderState, action) => {
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    });
  },
});

export const {
  addIngredient,
  addBuns,
  replaceIngredient,
  deleteIngredient,
  clearOrderList,
  displayOrderModal,
  hideOrderModal,
} = orderSlice.actions;

export { checkoutOrder };
export default orderSlice.reducer;
