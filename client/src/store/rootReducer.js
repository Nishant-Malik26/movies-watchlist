import { combineReducers } from "redux";
import moviesSlice from "./moviesSlice";
import authSlice from "./authSlice";
import alert from "./alert";

export default combineReducers({ auth: authSlice, movies: moviesSlice, alert });
