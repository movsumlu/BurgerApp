import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, checkOkResponse, checkSuccessResponse } from "services/API";
import { getCookie } from "services/cookie";

export const checkoutOrder = createAsyncThunk(
  "modal/checkoutOrder",
  async (IDOfIngredients: Array<string>) =>
    fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({ ingredients: IDOfIngredients }),
    })
      .then(checkOkResponse)
      .then(checkSuccessResponse)
      .then(({ order }: { order: { number: number } }) => order)
);
