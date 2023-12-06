import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_INGREDIENTS_URL,
  checkOkResponse,
  checkSuccessResponse,
} from "services/API";

import { IBurgerIngredientsItem } from "types/interfaces";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () =>
    fetch(`${FETCH_INGREDIENTS_URL}`)
      .then(checkOkResponse)
      .then(checkSuccessResponse)
      .then(({ data }: { data: IBurgerIngredientsItem[] }) => data)
);
