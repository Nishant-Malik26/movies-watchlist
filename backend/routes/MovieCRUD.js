const express = require("express");
const Movie = require("../models/Movie");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id });
    return res.json(movies);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

router.post("/", auth, async (req, res) => {
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

router.put("/:id", auth, async (req, res) => {
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

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(204).json({ msg: "Movie Deleted Sccesfully" });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
});

router.post("/:id/reviews", auth, async (req, res) => {
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

router.put("/:id/rating", auth, async (req, res) => {
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

router.put("/:id/watchStatus", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (movie?.watchStatus) {
      movie.watchStatus = false;
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

module.exports = router;
