import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import Watchlist from "./components/Watchlist";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Signin from "./components/Signin";
import { PrivateRoutes } from "./components/routing/PrivateRoutes";
import { loadUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/watchlist" element={<Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;