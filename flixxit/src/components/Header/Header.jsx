import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="tabs">
        <NavLink
          to="/"
          exact
          className={`tab ${selectedTab === "home" ? "selected" : ""}`}
          onClick={() => handleTabClick("home")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={`tab ${selectedTab === "about" ? "selected" : ""}`}
          onClick={() => handleTabClick("about")}
        >
          About Us
        </NavLink>
        <NavLink
          to="/pricing"
          className={`tab ${selectedTab === "pricing" ? "selected" : ""}`}
          onClick={() => handleTabClick("pricing")}
        >
          Pricing
        </NavLink>
      </div>
      <div className="signup-button">
        <button>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
