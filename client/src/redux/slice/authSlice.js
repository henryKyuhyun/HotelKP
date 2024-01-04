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
      localStorage.clear();
    },
    withdrawal: (state) => {
      state.isLoggedIn = false;
      state.userRole = "";
      state.userId="";
      state.token="";
      localStorage.clear();
    },
  },
});

export const { login, logout, withdrawal } = authSlice.actions;

export default authSlice.reducer;
