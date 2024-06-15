import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup";
import Watchlist from "./components/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlist={[
                {
                  key: "fdzxfcgvhjiokoijhg",
                  title: "khjbj",
                  description: "bjhsvjh",
                  releaseYear: "5098",
                  genre: "huegu",
                },
                {
                  key: "fdzxfcvhcgjjgcjiokoijhg",
                  title: "khjbj",
                  description: "bjhsvjh",
                  releaseYear: "5098",
                  genre: "huegu",
                },
              ]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
