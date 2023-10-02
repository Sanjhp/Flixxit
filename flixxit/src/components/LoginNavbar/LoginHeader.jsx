import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import styles from "./LoginHeader.module.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const LoginHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const toggleSidebar = (event) => {
    event.stopPropagation(); // Prevent event propagation to the document
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    window.location.reload();
  };

  useEffect(() => {
    fetchTMDBGenres();
  }, []);

  const fetchTMDBGenres = async () => {
    try {
      const API_KEY = "634e2f77ea5af8af8758e53e75fe8937";
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
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
          <button
            id="toggle-button"
            className={styles["toggle-button"]}
            onClick={toggleSidebar}
          >
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
            <Link to={`/search-results?query=${searchQuery}`}>
              <FaSearch className={styles["search-icon"]} />
            </Link>
          </div>
          <FaUser className={styles["user-icon"]} />
        </div>
      </header>
      {isSidebarOpen && (
        <div className={styles["modal-container"]} ref={sidebarRef}>
          <div className={styles["modal-sidebar"]}>
            <div className={styles["tabs"]}>
              {genres.map((genre) => (
                <Link
                  to={`/genre-search?query=${genre.id}`}
                  key={genre.id}
                  className={styles["genre-tab"]}
                >
                  {genre.name}
                </Link>
              ))}
              <Link to="/settings" className={styles["settings-logout-tab"]}>
                Settings
              </Link>
              <span
                className={styles["settings-logout-tab"]}
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginHeader;
