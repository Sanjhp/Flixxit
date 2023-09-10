const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  language: {
    type: [String], // This field will accept an array of strings for languages
    default: [], // Default to an empty array
  },
  genre: {
    type: [String], // This field will accept an array of strings for genres
    default: [], // Default to an empty array
  },
});

module.exports = mongoose.model("User", userSchema);
