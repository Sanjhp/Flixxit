import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";

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
    username: "",
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
      const response = await axios.post("/login", formData);
      console.log("Login successful:", response.data);
      // Add your logic for successful login (e.g., redirect to a dashboard)
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials.");
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
            <label className={label} htmlFor="username">
              Username
            </label>
            <input
              className={input}
              type="text"
              id="username"
              name="username"
              value={formData.username}
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
            <a className={signupLink} href="#">
              Sign Up
            </a>
          </p>
          <p>
            <a className={forgotPasswordLink} href="#">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;