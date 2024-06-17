import { combineReducers } from "redux";
import moviesSlice from "./moviesSlice";
import authSlice from "./authSlice";

export default combineReducers({ auth: authSlice, movies: moviesSlice });
