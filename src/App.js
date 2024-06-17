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
                  key: "fdzxfcgvhbhvhvghcjiokoijhg",
                  title: "khjbj",
                  description: "bjhsvjh",
                  releaseYear: "5098",
                  genre: "huegu",
                },
                {
                  title: "Sample Movie",
                  description: "This is a sample movie description.",
                  releaseYear: "2024",
                  genre: "Drama",
                  watchStatus: "Watched",
                  rating: "4.5/5",
                  reviews: [
                    "Great movie!",
                    "Really enjoyed it!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                    "Must watch!",
                  ],
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
