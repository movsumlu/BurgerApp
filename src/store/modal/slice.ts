import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBurgerIngredientsItem } from "types/interfaces";
import { checkoutOrder } from "./asyncThunks";

interface IModalState {
  showIngredientModal: boolean;
  showOrderModal: boolean;
  selectedIngredient: IBurgerIngredientsItem | null;
  order: {
    number: number;
  } | null;
  loading: boolean;
  errors: any;
}

const initialState: IModalState = {
  showIngredientModal: false,
  showOrderModal: false,

  selectedIngredient: null,

  order: null,
  loading: false,
  errors: null,
};

const ingredientsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    displayIngredientModal(state) {
      return {
        ...state,
        showIngredientModal: true,
      };
    },
    hideIngredientModal(state) {
      return {
        ...state,
        selectedIngredient: null,
        showIngredientModal: false,
      };
    },
    selectIngredient(state, action: PayloadAction<IBurgerIngredientsItem>) {
      return {
        ...state,
        selectedIngredient: action.payload,
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
    builder.addCase(checkoutOrder.pending, (state: IModalState) => {
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

    builder.addCase(checkoutOrder.rejected, (state: IModalState, action) => {
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    });
  },
});

export const {
  displayIngredientModal,
  hideIngredientModal,
  displayOrderModal,
  hideOrderModal,
  selectIngredient,
} = ingredientsSlice.actions;

export { checkoutOrder };
export default ingredientsSlice.reducer;
