import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  LOGIN_URL,
  REGISTER_URL,
  LOGOUT_URL,
  checkOkResponse,
  checkSuccessResponse,
} from "services/API";

import { setCookie, deleteAllCookies } from "services/cookie";

interface IUserData {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
}

export const loginUser = createAsyncThunk(
  "profile/loginUser",
  (formData: { email: string; password: string }) =>
    fetch(`${LOGIN_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(checkOkResponse)
      .then(checkSuccessResponse)
      .then(({ accessToken, refreshToken, user }: IUserData) => {
        setCookie("token", accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", refreshToken);

        return user;
      })
);

export const logoutUser = createAsyncThunk("profile/logoutUser", () =>
  fetch(`${LOGOUT_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  })
    .then(checkOkResponse)
    .then(checkSuccessResponse)
    .then(() => {
      deleteAllCookies();
      localStorage.removeItem("resetPasswordStepPassed");
    })
);

export const registerUser = createAsyncThunk(
  "profile/registerUser",
  (formData: { email: string; password: string }) =>
    fetch(`${REGISTER_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(checkOkResponse)
      .then(checkSuccessResponse)
      .then(({ accessToken, refreshToken, user }: IUserData) => {
        setCookie("token", accessToken.split("Bearer ")[1]);
        localStorage.setItem("refreshToken", refreshToken);

        return user;
      })
);
