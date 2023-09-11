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

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
    },
  ],
  languages: [
    {
      type: String,
    },
  ],
  selectedPlan: {
    type: String,
  },
  paymentMethod: {
    type: Object, // You can adjust this type based on your needs
  },
});
const collection = mongoose.model("collection", userSchema);

module.exports = collection;
