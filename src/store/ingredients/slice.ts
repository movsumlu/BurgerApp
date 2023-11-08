import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchIngredients } from "./asyncThunks";

import { IBurgerIngredientsItem } from "types/interfaces";

interface IIngredientsState {
  ingredients: IBurgerIngredientsItem[];
  loading: boolean;
  errors: any;
}

const initialState: IIngredientsState = {
  ingredients: [],
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

export const { uploadIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;

export { fetchIngredients };
