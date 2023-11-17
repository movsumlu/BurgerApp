import { createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredientsItem } from "types/interfaces";
import { swapArrayElements } from "utils/helper";
import { checkoutOrder } from "./asyncThunks";

interface IOrderState {
  buns: IBurgerIngredientsItem | null;
  ingredients: IBurgerIngredientsItem[];
  order: {
    number: number;
  } | null;
  showOrderModal: boolean;
  loading: boolean;
  errors: any;
}

const initialState: IOrderState = {
  buns: null,
  ingredients: [],
  order: null,
  showOrderModal: false,
  loading: false,
  errors: null,
};

const orderSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    addBuns(state, action) {
      return {
        ...state,
        buns: action.payload[0],
      };
    },
    addIngredient(state, action) {
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    },
    replaceIngredients(state, action) {
      const { dragIndex, hoverIndex } = action.payload;

      const replacedIngredients = swapArrayElements(
        [...state.ingredients],
        dragIndex,
        hoverIndex
      );

      return {
        ...state,
        ingredients: [...replacedIngredients],
      };
    },
    deleteIngredient(state, action) {
      const deletedIngredient = [...state.ingredients];
      deletedIngredient.splice(action.payload, 1);

      return {
        ...state,
        ingredients: [...deletedIngredient],
      };
    },
    clearOrder(state) {
      return {
        ...state,
        buns: null,
        ingredients: [],
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
  replaceIngredients,
  deleteIngredient,
  clearOrder,
  displayOrderModal,
  hideOrderModal,
} = orderSlice.actions;

export default orderSlice.reducer;
