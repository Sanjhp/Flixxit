import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css"; // Import CSS module
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.tabs}>
        <ul>
          <li className={styles.tab}>
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          <li className={styles.tab}>
            <Link to="/pricing">
              <span>Pricing</span>
            </Link>
          </li>
          <li className={styles.tab}>
            <Link to="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.signupButton}>
        <Link to="/signUp">
          <button>Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
