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

const wishlistSchema = new mongoose.Schema({
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

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;
