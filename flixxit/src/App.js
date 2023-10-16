/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./components/TermsofUse/TermsofUse";
import LoginHeader from "./components/LoginNavbar/LoginHeader";
import LoginHome from "./components/LoginHome/LoginHome";
import Login from "./components/SignUp/Login";
// import SignupPage from "./components/SignUp/SignUp";
import ViewAll from "./components/SeeAll/viewAll";
import Genere from "./components/LoginHome/Genere/Genere";
import SearchResult from "./components/LoginNavbar/SearchResult";
import MovieDetailsPage from "./components/LoginHome/Genere/MovieDetailsPage";
import GenreSearch from "./components/GenreSearch/GenreSearch";
import Settings from "./components/Settings/Settings";
import SignupPage from "./components/SignUp/SignUpPage";

const App = () => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      console.log("token after set", token);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated ? <LoginHeader /> : <Header />}
        <div className="content">
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<Home />} />

            {isAuthenticated && <Route path="/home" element={<LoginHome />} />}
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/viewall" element={<ViewAll />} />
            {isAuthenticated && <Route path="/home" element={<LoginHome />} />}
            {!isAuthenticated && (
              <Route path="/signup" element={<SignupPage />} />
            )}
            {isAuthenticated && <Route path="/genere" element={<Genere />} />}
            {isAuthenticated && (
              <Route path="/settings" element={<Settings />} />
            )}
            {isAuthenticated && (
              <Route path="/search-results" element={<SearchResult />} />
            )}
            {isAuthenticated && (
              <Route path="/genre-search" element={<GenreSearch />} />
            )}
            {isAuthenticated && (
              <Route
                path="/movie-details/:movieId"
                element={<MovieDetailsPage />}
              />
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
