import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "types/types";

const initialState: UserState = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.name = initialState.name;
      state.lastname = initialState.lastname;
      state.email = initialState.email;
      state.phone = initialState.phone;
      state.password = initialState.password;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
