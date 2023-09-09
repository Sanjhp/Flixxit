/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
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

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/signin" element={<SignUp />} />
          </Routes>
        </div> */}
        <LoginHeader />
        {/* <LoginHome /> */}
        <Genere />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
