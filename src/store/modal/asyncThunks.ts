import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiURL, checkResponse } from "utils/burger-API";

export const checkoutOrder = createAsyncThunk(
  "modal/checkoutOrder",
  async (IDOfIngredients: Array<string>) => {
    try {
      const response = await fetch(`${apiURL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: IDOfIngredients }),
      });

      const { order } = await checkResponse(response);
      return order;
    } catch (error) {
      console.error(error);
    }
  }
);
