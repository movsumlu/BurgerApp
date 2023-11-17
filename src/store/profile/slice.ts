import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "services/cookie";

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
  reducers: {
    setUser(state, action) {
      const { name, email } = action.payload;

      return {
        ...state,
        name: name,
        email: email,
        authorizated: true,
      };
    },
    clearUser(state) {
      return {
        ...state,
        name: null,
        email: null,
        authorizated: false,
      };
    },
  },
});

export const { setUser, clearUser } = profileSlice.actions;

export default profileSlice.reducer;
