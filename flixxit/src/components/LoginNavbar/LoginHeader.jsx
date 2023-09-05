import React, { useState } from "react";
import { FaSearch, FaUser, FaBars } from "react-icons/fa";
import "./LoginHeader.scss";
import logo from "../../assets/logo.png";

const LoginHeader = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="login-header">
      <div className="left">
        <button className="toggle-button" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <div className="center">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="right">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <FaSearch className="search-icon" />
        </div>
        <FaUser className="user-icon" />
      </div>
    </header>
  );
};

export default LoginHeader;
