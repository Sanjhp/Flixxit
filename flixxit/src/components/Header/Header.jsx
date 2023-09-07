import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="tabs">
        <ul>
          <li className="tab">
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          <li className="tab">
            <Link to="/pricing">
              <span>Pricing</span>
            </Link>
          </li>
          <li className="tab">
            <Link to="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="signup-button">
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
