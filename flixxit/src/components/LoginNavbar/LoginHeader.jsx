import React, { useState } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import styles from "./LoginHeader.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const LoginHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className={styles["login-header"]}>
      <div className={styles["left"]}>
        <button className={styles["toggle-button"]} onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <div className={styles["center"]}>
        <img src={logo} alt="Logo" className={styles["logo"]} />
      </div>
      <div className={styles["right"]}>
        <div className={styles["search-bar"]}>
          <input
            type="text"
            placeholder="Search..."
            className={styles["search-input"]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Use Link component for navigation with searchQuery as parameter */}
          <Link to={`/search-results?query=${searchQuery}`}>
            <FaSearch className={styles["search-icon"]} />
          </Link>
        </div>
        <FaUser className={styles["user-icon"]} />
      </div>
    </header>
  );
};

export default LoginHeader;
