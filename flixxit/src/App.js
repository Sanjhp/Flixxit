/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
// import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contact/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./components/TermsofUse/TermsofUse";
import LoginHeader from "./components/LoginNavbar/LoginHeader";
import LoginHome from "./components/LoginHome/LoginHome";
import { SignUp } from "./components/SignUp/SignUp";
import Genere from "./components/LoginHome/Genere";
import AboutMovie from "./components/LoginHome/AboutMovie";
import Signup from "./components/SignUp/Sign";
import Login from "./components/SignUp/Login";
import Home from "./components/SignUp/Home";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* <Header /> */}
        <LoginHeader />
        <div className="content">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/signin" element={<SignUp />} />
            <Route path="/about-movie/id" element={<AboutMovie />} /> */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        {/* <LoginHome /> */}
        {/* <AboutMovie /> */}
        {/* <Genere /> */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
