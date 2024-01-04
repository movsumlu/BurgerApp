import { IBurgerIngredientsItem } from "types/interfaces";
import { testBun, testIngredient } from "utils/mockData";
import { orderSlice } from "./slice";

interface IOrderState {
  buns: IBurgerIngredientsItem | null;
  ingredients: IBurgerIngredientsItem[];
  order: {
    number: number;
  } | null;
  showOrderModal: boolean;
  showFeedModal: boolean;
  loading: boolean;
  errors: any;
}

const initialState: IOrderState = {
  buns: null,
  ingredients: [],
  order: null,
  showOrderModal: false,
  showFeedModal: false,
  loading: false,
  errors: null,
};

describe("testing orderSlice", () => {
  it("should add buns to state", () => {
    const expected = {
      ...initialState,
      buns: testBun,
      ingredients: [],
    };

    const received = orderSlice.reducer(
      initialState,
      orderSlice.actions.addBuns(testBun)
    );

    expect(received).toEqual(expected);
  });

  it("should add ingredient to state", () => {
    const expected = {
      ...initialState,
      buns: null,
      ingredients: [testIngredient],
    };

    const received = orderSlice.reducer(
      initialState,
      orderSlice.actions.addIngredient(testIngredient)
    );

    expect(received).toEqual(expected);
  });
  it("should delete ingredient by index in order", () => {
    const expected = {
      ...initialState,
      buns: null,
      ingredients: [],
    };

    const orderWithIngredient = orderSlice.reducer(
      initialState,
      orderSlice.actions.addIngredient(testIngredient)
    );

    let index = orderWithIngredient.ingredients.findIndex(
      ({ _id }) => _id === testIngredient._id
    );

    const received = orderSlice.reducer(
      orderWithIngredient,
      orderSlice.actions.deleteIngredient(index)
    );

    expect(received).toEqual(expected);
  });
  it("should clear order", () => {
    const expected = {
      ...initialState,
      buns: null,
      ingredients: [],
    };

    const received = orderSlice.reducer(
      initialState,
      orderSlice.actions.clearOrder()
    );

    expect(received).toEqual(expected);
  });
});
