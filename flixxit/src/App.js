import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Genere from "./components/LoginHome/Genere";
import AboutMovie from "./components/LoginHome/AboutMovie";
import Login from "./components/SignUp/Login";
import SignupPage from "./components/SignUp/SignUp";
import { isAuthenticated } from "./authService";
import ViewAll from "./components/SeeAll/viewAll";

const PrivateRoutes = () => {
  return (
    <>
      <Route path="/login-home" element={<LoginHome />} />
      <Route path="/genere" element={<Genere />} />
      <Route path="/about-movie" element={<AboutMovie />} />
    </>
  );
};

const App = () => {
  const userIsAuthenticated = isAuthenticated();

  return (
    <Router>
      <div className="app-container">
        {userIsAuthenticated ? <LoginHeader /> : <Header />}
        <div className="content">
          <Routes>
            {userIsAuthenticated ? (
              <PrivateRoutes />
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/viewall" element={<ViewAll />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
