const express = require("express");
const collection = require("../backend/mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

app.get("/", cors(), (req, res) => {
  // Handle your root route if needed
});

app.post("/signup", async (req, res) => {
  const {
    username,
    email,
    password,
    selectedPlan,
    selectedGenres,
    selectedLanguages,
  } = req.body;

  const userData = {
    username: username,
    email: email,
    password: password,
    selectedPlan: selectedPlan,
    selectedGenres: selectedGenres,
    selectedLanguages: selectedLanguages,
  };

  try {
    const checkEmail = await collection.findOne({ email: email });

    if (checkEmail) {
      res.json({ message: "User already exists" });
    } else {
      // You should hash the password before saving it to the database
      // Implement password hashing here, for example, using bcrypt

      // Save the user data to the database
      await collection.create(userData);

      res.json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(500).json({ error: "Signup failed. Please try again." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
