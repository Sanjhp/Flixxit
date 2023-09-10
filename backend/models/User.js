const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4(), // Generate a random UUID as the default value
  },
  name: {
    type: String,
    required: true,
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
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  languages: [
    {
      type: String,
    },
  ],
  genres: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
