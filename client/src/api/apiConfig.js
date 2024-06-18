import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://movies-watchlist-8dfq.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
