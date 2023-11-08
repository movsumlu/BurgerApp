import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiURL, checkResponse } from "utils/burger-API";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const response = await fetch(`${apiURL}/api/ingredients`);
      const { data } = await checkResponse(response);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
