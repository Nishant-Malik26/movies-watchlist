import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/apiConfig";

const initialState = {
  movies: [],
  watchlist: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axiosInstance.get("/movies");
  return response.data;
});

export const addMovie = createAsyncThunk("movies/addMovie", async (movie) => {
  const response = await axiosInstance.post("/movies", movie);
  return response.data;
});

export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, movie }) => {
    const response = await axiosInstance.put(`/movies/${id}`, movie);
    return response.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id) => {
    await axiosInstance.delete(`/movies/${id}`);
    return id;
  }
);

export const updateRating = createAsyncThunk(
  "movies/updateRating",
  async ({ id, rating }) => {
    const response = await axiosInstance.put(`/movies/${id}/rating`, {
      rating,
    });
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  "movies/addReview",
  async ({ id, review }) => {
    const response = await axiosInstance.post(`/movies/${id}/reviews`, {
      review,
    });
    return response.data;
  }
);

export const fetchWatchlist = createAsyncThunk(
  "movies/fetchWatchlist",
  async () => {
    const response = await axiosInstance.get("/watchlist");
    return response.data;
  }
);

export const addToWatchlist = createAsyncThunk(
  "movies/addToWatchlist",
  async (id) => {
    const response = await axiosInstance.post(`/watchlist/${id}`);
    return response.data;
  }
);

export const removeFromWatchlist = createAsyncThunk(
  "movies/removeFromWatchlist",
  async (id) => {
    await axiosInstance.delete(`/watchlist/${id}`);
    return id;
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
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.watchlist.push(action.payload);
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.watchlist = state.watchlist.filter(
          (movie) => movie._id !== action.payload
        );
      });
  },
});

export default moviesSlice.reducer;
