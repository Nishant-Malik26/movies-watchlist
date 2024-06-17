import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/apiConfig";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user) => {
    const response = await axiosInstance.post("/auth/register", user);
    return response.data;
  }
);

export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
  const response = await axiosInstance.post("/auth/login", user);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    loadUser: (state) => {
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      });
  },
});

export const { logout, loadUser } = authSlice.actions;

export default authSlice.reducer;
