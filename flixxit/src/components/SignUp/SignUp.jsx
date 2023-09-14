/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "./CardForm";
import { Link, useNavigate } from "react-router-dom";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51M1dLSLYXLDeaQnCJepttEdwWxLkuFRopP2LeAeaxewCVcNFjpcwQzeuQu56uzkuDspv65uvvWrZOOKtYx8loXfn00paTCPhV9"
); // Replace with your Stripe publishable key

function SignupPage() {
  const navigate = useNavigate();

  // State variables to manage form data, user selections, errors, and the current step
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    // Add more genres as needed
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ru", name: "Russian" },
    // Add more languages as needed
  ];

  const pricingOptions = [
    {
      id: "monthly",
      name: "Monthly Plan",
      price: "$9.99/month",
    },
    {
      id: "quarterly",
      name: "Quarterly Plan",
      price: "$24.99/quarter",
    },
    {
      id: "annual",
      name: "Annual Plan",
      price: "$89.99/year",
    },
  ];
  // Event handler for form input changes

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Data for genres, languages, and pricing options

  // Event handler for selecting/deselecting genres
  const handleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(
        selectedGenres.filter((selected) => selected !== genre)
      );
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Event handler for selecting/deselecting languages
  const handleLanguageSelection = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((selected) => selected !== language)
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handlePayment = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  };

  // Event handler for selecting a pricing plan
  const handlePricingSelection = (pricingId) => {
    setSelectedPlan(pricingId);
  };

  // Event handler for submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields here

    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
      } else {
        setError(""); // Clear any previous errors

        // Create an object containing all user data
        const userData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          selectedPlan: selectedPlan,
          selectedGenres: selectedGenres,
          selectedLanguages: selectedLanguages,
        };

        // Send the signup request to the server with all user data
        const response = await axios.post(
          "http://localhost:5000/signup",
          userData
        );

        if (response.data.message === "User created successfully") {
          // Handle successful signup, e.g., redirect to a login page
          navigate("/signin");
          // You can also set a success message to inform the user
          // Redirect or display a success message here
        } else if (response.data.message === "User already exists") {
          setError("User with this email already exists.");
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Sign-up failed. Please try again.");
    }
  };

  // Helper function to render genre cards
  const renderGenres = () => {
    return genres.map((genre) => (
      <div
        key={genre.id}
        className={`${styles.genreCard} ${
          selectedGenres.includes(genre) ? styles.selected : ""
        }`}
        onClick={() => handleGenreSelection(genre)}
      >
        {genre.name}
      </div>
    ));
  };

  // Helper function to render language cards
  const renderLanguages = () => {
    return languages.map((language) => (
      <div
        key={language.code}
        className={`${styles.languageCard} ${
          selectedLanguages.includes(language) ? styles.selected : ""
        }`}
        onClick={() => handleLanguageSelection(language)}
      >
        {language.name}
      </div>
    ));
  };

  // Helper function to render pricing option cards
  const renderPricingOptions = () => {
    return pricingOptions.map((option) => (
      <div
        key={option.id}
        className={`${styles.pricingCard} ${
          selectedPlan === option.id ? styles.selected : ""
        }`}
        onClick={() => handlePricingSelection(option.id)}
      >
        <h3>{option.name}</h3>
        <p>{option.price}</p>
      </div>
    ));
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.signupCard}>
        <h2 className={styles.h2}>
          {step === 1
            ? "SIGN UP"
            : step === 2
            ? "Step 2: Select Plan"
            : step === 3
            ? "Step 3: Payment"
            : step === 4
            ? "Step 4: Select Genres"
            : "Step 5: Select Languages"}
        </h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.input}
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.input}
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label} htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={styles.input}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button className={styles.button} onClick={() => setStep(2)}>
              Sign Up
            </button>
          </form>
        ) : step === 2 ? (
          <div>
            <div className={styles.pricingContainer}>
              {renderPricingOptions()}
            </div>
            <button
              className={styles.button}
              onClick={() => setStep(3)}
              disabled={!selectedPlan}
            >
              Next
            </button>
          </div>
        ) : step === 3 ? (
          <div>
            <h3>Payment Information:</h3>
            <Elements stripe={stripePromise}>
              <CardForm handlePayment={handlePayment} />
            </Elements>
            <button
              className={styles.button}
              onClick={() => setStep(4)}
              disabled={!paymentMethod}
            >
              Next
            </button>
          </div>
        ) : step === 4 ? (
          <div>
            <h3>Select Movie Genres:</h3>
            <div className={styles.genreContainer}>{renderGenres()}</div>
            <button
              className={styles.button}
              onClick={() => setStep(5)}
              disabled={selectedGenres.length === 0}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <h3>Select Language Preferences:</h3>
            <div className={styles.languageContainer}>{renderLanguages()}</div>
            <button
              className={styles.button}
              onClick={handleSubmit}
              disabled={selectedLanguages.length === 0}
            >
              Complete Signup
            </button>
          </div>
        )}
      </div>
      <p className={styles.loginLinkp}>
        Already have an account?
        <Link to="/signin" className={styles.loginLink}>
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
