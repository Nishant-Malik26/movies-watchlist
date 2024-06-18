import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axiosInstance from "../api/apiConfig";
import { setAlertWithRemove } from "./removeAlert";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", user);
      thunkAPI.dispatch(
        setAlertWithRemove({
          msg: "User Created Successfully",
          alertType: "success",
        })
      );
      return response.data;
    } catch (error) {
      if (Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach((error) =>
          thunkAPI.dispatch(
            setAlertWithRemove({ msg: error, alertType: "danger" })
          )
        );
      } else {
        thunkAPI.dispatch(
          setAlertWithRemove({
            msg: error.response.data.errors,
            alertType: "danger",
          })
        );
      }
      return thunkAPI.rejectWithValue(
        error.response.data.errors || "Invalid Credentials"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", user);
      return response.data;
    } catch (error) {
      if (Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach((error) =>
          thunkAPI.dispatch(
            setAlertWithRemove({ msg: error, alertType: "danger" })
          )
        );
      } else {
        thunkAPI.dispatch(
          setAlertWithRemove({
            msg: error.response.data.errors,
            alertType: "danger",
          })
        );
      }
      return thunkAPI.rejectWithValue(
        error.response.data.errors || "Invalid Credentials"
      );
    }
  }
);

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
        localStorage.setItem("token", action.payload?.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload?.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addMatcher(isRejectedWithValue, (state, action) => {
        localStorage.setItem("token", null);
        state.token = null;
        state.isAuthenticated = false;
        state.loading = true;
      });
  },
});

export const { logout, loadUser } = authSlice.actions;

export default authSlice.reducer;
