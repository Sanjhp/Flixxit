import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  // Destructure styles
  const {
    background,
    loginCard,
    h2,
    errorMessage,
    signupLink,
    forgotPasswordLink,
    button,
    inputContainer,
    label,
    input,
    rememberMe,
    rememberMeLabel,
    rememberMeCheckbox,
    loginOptions,
  } = styles;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log("Login successful:", response.data);
      // Handle successful login
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setError("Incorrect email or password.");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div>
      <div className={background}></div>
      <div className={loginCard}>
        <h2 className={h2}>LOGIN</h2>
        {error && <p className={errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={inputContainer}>
            <label className={label} htmlFor="email">
              E-mail
            </label>
            <input
              className={input}
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={inputContainer}>
            <label className={label} htmlFor="password">
              Password
            </label>
            <input
              className={input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={rememberMe}>
            <label className={rememberMeLabel}>
              <input
                className={rememberMeCheckbox}
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>
          <button className={button} type="submit">
            Login
          </button>
        </form>
        <div className={loginOptions}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className={signupLink}>
              Sign Up
            </Link>
          </p>
          <p>
            <Link to="/signup" className={forgotPasswordLink}>
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
