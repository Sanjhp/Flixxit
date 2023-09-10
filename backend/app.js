// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/node-authentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
