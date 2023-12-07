import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "services/cookie";
import { loginUser, registerUser, logoutUser } from "./asyncThunks";

interface IProfileState {
  authorizated: boolean;
  name: string | null;
  email: string | null;
  loading: boolean;
  errors: any;
}

const initialState: IProfileState = {
  authorizated: !!getCookie("token"),
  name: null,
  email: null,
  loading: false,
  errors: null,
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: IProfileState) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { name, email } = action.payload;

      return {
        ...state,
        name: name,
        email: email,
        authorizated: true,
        loading: false,
      };
    });

    builder.addCase(loginUser.rejected, (state: IProfileState, action) => {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    });

    builder.addCase(registerUser.pending, (state: IProfileState) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { name, email } = action.payload;

      return {
        ...state,
        name: name,
        email: email,
        authorizated: true,
        loading: false,
      };
    });

    builder.addCase(registerUser.rejected, (state: IProfileState, action) => {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    });

    builder.addCase(logoutUser.pending, (state: IProfileState) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      return {
        ...state,
        name: null,
        email: null,
        authorizated: false,
        loading: false,
      };
    });

    builder.addCase(logoutUser.rejected, (state: IProfileState, action) => {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    });
  },
});

export default profileSlice.reducer;
