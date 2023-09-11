import React, { useState } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import styles from "./LoginHeader.module.css"; // Import CSS module
import logo from "../../assets/logo.png";

const LoginHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
          />
          <FaSearch className={styles["search-icon"]} />
        </div>
        <FaUser className={styles["user-icon"]} />
      </div>
    </header>
  );
};

export default LoginHeader;
