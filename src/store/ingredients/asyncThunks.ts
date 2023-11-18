import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, checkResponse } from "services/API";

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    const response = await fetch(`${API_URL}/api/ingredients`);
    const { data } = await checkResponse(response);
    return data;
  }
);
