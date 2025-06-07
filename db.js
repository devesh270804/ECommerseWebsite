const mongoose = require("mongoose");
require("dotenv").config();

var mongoURL = process.env.MONGO_URI;

mongoose
  .connect(mongoURL)
  .then(console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection failed", err));

module.exports = mongoose;
