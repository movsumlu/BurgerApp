import { IBurgerIngredientsItem } from "types/interfaces";
import { testIngredient } from "utils/mockData";
import { ingredientsSlice } from "./slice";

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

describe("testing ingredientsSlice", () => {
  it("should select ingredient", () => {
    const expected = {
      ...initialState,
      selectedIngredient: testIngredient,
    };

    const received = ingredientsSlice.reducer(
      initialState,
      ingredientsSlice.actions.selectIngredient(testIngredient)
    );

    expect(received).toEqual(expected);
  });
  it("should display ingredient modal", () => {
    const expected = {
      ...initialState,
      showIngredientModal: true,
    };

    const received = ingredientsSlice.reducer(
      initialState,
      ingredientsSlice.actions.displayIngredientModal()
    );

    expect(received).toEqual(expected);
  });
  it("should hide ingredient modal", () => {
    const expected = {
      ...initialState,
      showIngredientModal: false,
    };

    const received = ingredientsSlice.reducer(
      initialState,
      ingredientsSlice.actions.hideIngredientModal()
    );

    expect(received).toEqual(expected);
  });
});
