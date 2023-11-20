import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchIngredients } from "./asyncThunks";

import { IBurgerIngredientsItem } from "types/interfaces";

interface IIngredientsState {
  ingredients: IBurgerIngredientsItem[];
  selectedIngredient: IBurgerIngredientsItem | null;
  showIngredientModal: boolean;
  loading: boolean;
  errors: any;
}

const initialState: IIngredientsState = {
  ingredients: [],
  selectedIngredient: null,
  showIngredientModal: false,
  loading: false,
  errors: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    uploadIngredients(state, action: PayloadAction<IBurgerIngredientsItem[]>) {
      state.ingredients = action.payload;
    },
    selectIngredient(state, action: PayloadAction<IBurgerIngredientsItem>) {
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    },
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
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state: IIngredientsState) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<IBurgerIngredientsItem[]>) => {
        return {
          ...state,
          ingredients: action.payload,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchIngredients.rejected,
      (state: IIngredientsState, action) => {
        return {
          ...state,
          errors: action.payload,
          loading: false,
        };
      }
    );
  },
});

export const {
  uploadIngredients,
  selectIngredient,
  displayIngredientModal,
  hideIngredientModal,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
