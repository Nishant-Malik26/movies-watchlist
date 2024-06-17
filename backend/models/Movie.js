import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: String,
  genre: String,
  rating: Number,
  reviews: [String],
  watchStatus: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Movie", MovieSchema);
