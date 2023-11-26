import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_INGREDIENTS_URL,
  checkOkResponse,
  checkSuccessResponse,
} from "services/API";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () =>
    fetch(`${FETCH_INGREDIENTS_URL}`)
      .then(checkOkResponse)
      .then(checkSuccessResponse)
      .then(({ data }) => data)
);
