const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.NODE_PORT;

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
mongoose.connect(process.env.MONGO_URL);

app.use("/auth", require("./routes/Auth"));
app.use("/movies", require("./routes/MovieCRUD"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
