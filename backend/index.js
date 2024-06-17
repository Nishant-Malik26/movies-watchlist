const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middlewares/auth");

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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Movie = mongoose.model("Movie", movieSchema);
const Watchlist = mongoose.model("Watchlist", movieSchema);

app.use("/auth", require("./routes/Auth"));

app.get("/movies", auth, async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id });
    return res.json(movies);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

app.post("/movies", auth, async (req, res) => {
  try {
    const { title, description, releaseYear, genre } = req.body;
    const newMovie = new Movie({
      title,
      description,
      releaseYear,
      genre,
      rating: 0,
      reviews: [],
      watchStatus: false,
      user: req.user.id,
    });
    await newMovie.save();
    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

app.put("/movies/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, releaseYear, genre } = req.body;
    const movie = await Movie.findById(id);
    if (movie) {
      movie.title = title || movie.title;
      movie.description = description || movie.description;
      movie.releaseYear = releaseYear || movie.releaseYear;
      movie.genre = genre || movie.genre;
      await movie.save();
      return res.json(movie);
    } else {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

app.delete("/movies/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(204).json({ msg: "Movie Deleted Sccesfully" });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

app.post("/movies/:id/reviews", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { review } = req.body;
    const movie = await Movie.findById(id);
    if (movie) {
      movie.reviews.push(review);
      await movie.save();
      return res.status(201).json(movie);
    } else {
      return res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

app.put("/movies/:id/rating", auth, async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

app.put("/watchlist/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (movie?.watchStatus) {
      movie.watchStatus = false;
      // const updatedMovie = new Movie
      await movie.save();
      return res.status(201).json(movie);
    } else {
      movie.watchStatus = true;
      await movie.save();
      return res.status(201).json(movie);
    }
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

// app.delete("/watchlist/:id", auth, async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Watchlist.findByIdAndDelete(id);
//     res.status(204).send();
//   } catch (error) {}
// });

app.get("/watchlist", auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find();
    res.status(200).json(watchlist);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
