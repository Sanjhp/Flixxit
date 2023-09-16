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
      id: Number, // Change the type to Number or another appropriate type
      name: String, // Change the type to String
    },
  ],
  languages: [
    {
      code: String, // Change the type to String
      name: String, // Change the type to String
    },
  ],
  selectedPlan: {
    type: String,
  },
  paymentMethod: {
    type: Object,
  },
});

const collection = mongoose.model("collection", userSchema);

module.exports = collection;
