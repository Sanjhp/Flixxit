const express = require("express");
const collection = require("../backend/mongo");
const Watchlist = require("../backend/watchlist");
const Wishlist = require("../backend/wishlist");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Your JWT secret key (keep it secret and secure)
const jwtSecretKey =
  "5b1d1ea9e5c44e14f20d2d66386562f86772769e04663cdd8590e9e7a853e0a"; // Replace with your actual secret key

app.get("/all-data", async (req, res) => {
  try {
    // Fetch all data from the collection model
    const allData = await collection.find();

    // Return the fetched data as JSON response
    res.json(allData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, email, password, selectedPlan, genres, languages } =
    req.body;

  try {
    const checkEmail = await collection.findOne({ email: email });

    if (checkEmail) {
      res.json({ message: "User already exists" });
    } else {
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with the hashed password
      const userData = {
        username: username,
        email: email,
        password: hashedPassword,
        selectedPlan: selectedPlan,
        genres: genres,
        languages: languages,
      };
      console.log(userData);
      // Save the user data to the database
      await collection.create(userData);

      res.json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ error: "Signup failed. Please try again.", error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await collection.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Create a JWT token with user information
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      jwtSecretKey,
      { expiresIn: "1h" } // Token expiration time (e.g., 1 hour)
    );

    const response = {
      user: user,
      token: token,
    };

    // Return the  response
    res.status(200).json(response);
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed. Please try again." });
  }
});

app.put("/update-user/:userId", async (req, res) => {
  const userId = req.params.userId; // Extract user ID from the URL parameter
  const { username, email, selectedPlan, selectedGenres, selectedLanguages } =
    req.body;

  try {
    // Find the user by ID in the database
    const user = await collection.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user data with the provided values
    user.selectedPlan = selectedPlan;
    user.selectedGenres = selectedGenres;
    user.selectedLanguages = selectedLanguages;

    // Save the updated user data to the database
    await user.save();

    res.json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ error: "Update failed. Please try again." });
  }
});

app.post("/watchlist/add", async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    // Check if the movie already exists in the user's watchlist
    const existingWatchlistItem = await Watchlist.findOne({ userId, movieId });

    if (existingWatchlistItem) {
      // Movie already exists in the watchlist, return a response indicating that
      return res.json({ message: "Movie already in watchlist" });
    }

    // Create a new watchlist item
    const watchlistItem = new Watchlist({ userId, movieId });

    // Save the watchlist item to the database
    await watchlistItem.save();

    res.json({ message: "Movie added to watchlist" });
  } catch (error) {
    console.error("Failed to add movie to watchlist:", error);
    res.status(500).json({ error: "Failed to add movie to watchlist" });
  }
});

app.get("/watchlist/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch the user's watchlist items based on the userId
    const watchlist = await Watchlist.find({ userId });

    res.json(watchlist);
  } catch (error) {
    console.error("Failed to fetch watchlist:", error);
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
});

app.post("/wishlist/add", async (req, res) => {
  const { userId, movieId } = req.body;

  try {
    // Check if the movie already exists in the user's wishlist
    const existingWishlistItem = await Wishlist.findOne({ userId, movieId });

    if (existingWishlistItem) {
      // Movie already exists in the wishlist, so remove it
      await Wishlist.findOneAndDelete({ userId, movieId });

      res.json({ message: "Movie removed from wishlist" });
    } else {
      // Movie doesn't exist in the wishlist, so add it
      const wishlistItem = new Wishlist({ userId, movieId });
      await wishlistItem.save();

      res.json({ message: "Movie added to wishlist" });
    }
  } catch (error) {
    console.error("Error adding/removing movie to/from wishlist:", error);
    res
      .status(500)
      .json({ error: "Error adding/removing movie to/from wishlist" });
  }
});

app.get("/wishlist/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch the user's wishlist items based on the userId
    const wishlist = await Wishlist.find({ userId });

    res.json(wishlist);
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
