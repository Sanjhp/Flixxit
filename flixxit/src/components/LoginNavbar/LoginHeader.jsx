import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import styles from "./LoginHeader.module.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    window.location.reload();
  };

  useEffect(() => {
    function handleDocumentClick(event) {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        event.target.id !== "toggle-button"
      ) {
        setSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className={styles["app-container"]}>
      <header className={styles["login-header"]}>
        <div className={styles["left"]}>
          <Link to="/home">
            <img src={logo} alt="Logo" className={styles["logo"]} />
          </Link>
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
            <Link to={`/search-results?query=${searchQuery}`}>
              <FaSearch className={styles["search-icon"]} />
            </Link>
          </div>
          <div className={styles["logout-container"]} onClick={handleLogout}>
            <FaSignOutAlt className={styles["logout-icon"]} />
            <span className={styles["logout-text"]}>Logout</span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default LoginHeader;
