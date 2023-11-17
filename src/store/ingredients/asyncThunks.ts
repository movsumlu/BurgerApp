import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, checkResponse } from "services/API";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const response = await fetch(`${API_URL}/api/ingredients`);
      const { data } = await checkResponse(response);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);
