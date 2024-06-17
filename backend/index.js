const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
mongoose.connect(
  "mongodb+srv://nishantmalik2015:qYRh1Om8mNf8G7ih@cluster0.0uzogt3.mongodb.net/moviedb"
);

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: String,
  genre: String,
  rating: Number,
  reviews: [String],
  watchStatus: Boolean,
});

const Movie = mongoose.model("Movie", movieSchema);
const Watchlist = mongoose.model("Watchlist", movieSchema);

app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post("/movies", async (req, res) => {
  const { title, description, releaseYear, genre } = req.body;
  const newMovie = new Movie({
    title,
    description,
    releaseYear,
    genre,
    rating: 0,
    reviews: [],
    watchStatus: false,
  });
  await newMovie.save();
  res.status(201).json(newMovie);
});

app.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, releaseYear, genre } = req.body;
  const movie = await Movie.findById(id);
  if (movie) {
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.releaseYear = releaseYear || movie.releaseYear;
    movie.genre = genre || movie.genre;
    await movie.save();
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  res.status(204).send();
});

app.post("/movies/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  const movie = await Movie.findById(id);
  if (movie) {
    movie.reviews.push(review);
    await movie.save();
    res.status(201).json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.put("/movies/:id/rating", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  const movie = await Movie.findById(id);
  if (movie) {
    movie.rating = rating;
    await movie.save();
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.post("/watchlist/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (movie) {
    const existingMovie = await Watchlist.findById(id);
    if (!existingMovie) {
      const watchlistMovie = new Watchlist(movie.toObject());
      await watchlistMovie.save();
      res.status(201).json(watchlistMovie);
    } else {
      res.status(400).json({ message: "Movie already in watchlist" });
    }
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.delete("/watchlist/:id", async (req, res) => {
  const { id } = req.params;
  await Watchlist.findByIdAndDelete(id);
  res.status(204).send();
});

app.get("/watchlist", async (req, res) => {
  const watchlist = await Watchlist.find();
  res.json(watchlist);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
