// client/src/redux/slice/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userRole: "",
  userId:"",
  token:"",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userRole = action.payload.userRole;
      state.userId = action.payload.userId;
      state.token = action.payload.token;

    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userRole = "";
      state.userId = "";
      state.token="";

    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
