/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./profile.module.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardForm from "./CardForm";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51M1dLSLYXLDeaQnCJepttEdwWxLkuFRopP2LeAeaxewCVcNFjpcwQzeuQu56uzkuDspv65uvvWrZOOKtYx8loXfn00paTCPhV9"
);

function ProfileUpdate() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };
  useEffect(() => {
    getUserIdFromToken();
  }, []);

  const [userDetails, setUserDetails]= useState({})
  const [selectedGenres, setSelectedGenres] = useState(userDetails.genres || []);
  console.log('selectedGenres :>> ', selectedGenres);
  const [selectedLanguages, setSelectedLanguages] = useState(userDetails.languages || []);
  console.log('selectedLanguages :>> ', selectedLanguages);
  const [selectedPlan, setSelectedPlan] = useState(userDetails.selectedPlan || null);
  console.log('selectedPlan :>> ', selectedPlan);
  const [formData, setFormData] = useState({
    username: userDetails.username || "",
  });
  console.log('formData :>> ', formData);

  
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  console.log('userDetails :>> ', userDetails);

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selected) => selected !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  const handleLanguageSelection = (language) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter((selected) => selected !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  

  const handlePayment = (paymentMethod) => {
    setPaymentMethod(paymentMethod);
  };

  const handlePricingSelection = (pricingId) => {
    setSelectedPlan(pricingId);
  };

  const GetUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-user/${userId}`);
      const userData = response.data;
      console.log("User data: ", userData);
      setUserDetails(userData)
      setSelectedGenres(userData.genres || []);
      setSelectedLanguages(userData.languages || []);
      setSelectedPlan(userData.selectedPlan || null);
      setFormData({
        username: userData.username || "",
      });
  
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    GetUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
        setError(""); 
        const userData = {
          username: formData.username,
          selectedPlan: selectedPlan,
          genres: selectedGenres,
          languages: selectedLanguages,
        };
        console.log(userData);
        const response = await axios.put(
          `http://localhost:5000/update-user/${userId}`,
          userData
        );
        console.log('response :>> ', response);
        if(response.data.message==="User data updated successfully"){
          navigate("/home")
        }
      
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Sign-up failed. Please try again.");
    }
  };

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
            ? "Update Username"
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

            <button className={styles.button} onClick={() => setStep(2)} >
              update username
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
              Complete Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUpdate;
