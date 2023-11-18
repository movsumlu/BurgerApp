import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, checkResponse } from "services/API";

export const checkoutOrder = createAsyncThunk(
  "modal/checkoutOrder",
  async (IDOfIngredients: Array<string>) => {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: IDOfIngredients }),
    });

    const { order } = await checkResponse(response);
    return order;
  }
);
