const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://simisanjh3:flixxit@flixxit.319wg3r.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);
module.exports = Watchlist;
