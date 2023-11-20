import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_URL, REGISTER_URL, checkResponse } from "services/API";
import { setCookie } from "services/cookie";

export const loginUser = createAsyncThunk(
  "profile/loginUser",
  async (formData: { email: string; password: string }) => {
    const response = await fetch(`${LOGIN_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const { success, user, accessToken, refreshToken } = await checkResponse(
      response
    );

    if (success) {
      setCookie("token", accessToken.split("Bearer ")[1]);
      localStorage.setItem("refreshToken", refreshToken);

      return user;
    }
  }
);

export const registerUser = createAsyncThunk(
  "profile/registerUser",
  async (formData: { email: string; password: string }) => {
    const response = await fetch(`${REGISTER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const { success, user, accessToken, refreshToken } = await checkResponse(
      response
    );

    if (success) {
      setCookie("token", accessToken.split("Bearer ")[1]);
      localStorage.setItem("refreshToken", refreshToken);

      return user;
    }
  }
);
