import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axiosInstance from "../api/apiConfig";
import { logout } from "./authSlice";

const initialState = {
  movies: [],
  watchlist: [],
  status: "idle",
  error: null,
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/movies");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      throw error;
    }
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movie, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/movies", movie);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      throw error;
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, movie }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/movies/${id}`, movie);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      throw error;
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/movies/${id}`);
      return id;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      throw error;
    }
  }
);

export const updateRating = createAsyncThunk(
  "movies/updateRating",
  async ({ id, rating }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/movies/${id}/rating`, {
        rating,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      throw error;
    }
  }
);

export const addReview = createAsyncThunk(
  "movies/addReview",
  async ({ id, review }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/movies/${id}/reviews`, {
        review,
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      throw error;
    }
  }
);

export const toggleWatchstatus = createAsyncThunk(
  "movies/toggleWatchstatus",
  async (movie, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/watchlist/${movie?._id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return rejectWithValue("Unauthorized");
      }
      throw error;
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        state.movies[index] = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        );
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie._id === action.payload._id
        );
        state.movies[index] = action.payload;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const updatedMovie = action.payload;
        const existingMovie = state.movies.find(
          (movie) => movie._id === updatedMovie._id
        );
        if (existingMovie) {
          existingMovie.rating = updatedMovie.rating;
        }
      })

      .addCase(toggleWatchstatus.fulfilled, (state, action) => {
        const updatedMovie = action.payload;
        console.log("🚀 ~ .addCase ~ action.payload:", action.payload);
        const existingMovie = state.movies.find(
          (movie) => movie._id === updatedMovie._id
        );
        if (existingMovie) {
          existingMovie.watchStatus = updatedMovie.watchStatus;
        }
      })
      .addMatcher(isRejectedWithValue, (state, action) => {
        state.error = action.error.message;
        if (action.payload === "Unauthorized") {
          console.log("🚀 ~ .addMatcher ~ action.payload:", action.payload);
          logout();
        }
      });
  },
});

export default moviesSlice.reducer;
