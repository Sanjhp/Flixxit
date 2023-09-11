import React, { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css"; // Import CSS module

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const response = await axios.post("/signup", formData);
      console.log("Sign-up successful:", response.data);
      // Add your logic for successful sign-up (e.g., redirect to a dashboard)
    } catch (error) {
      console.error("Sign-up failed:", error);
      setError("Sign-up failed. Please try again.");
    }
  };

  return (
    <div>
      <div className={styles.background}></div>
      <div className={styles.signupCard}>
        <h2 className={styles.h2}>Sign Up</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
        <div className={styles.loginOptions}>
          <p>
            Already have an account?{" "}
            <a className={styles.loginLink} href="#">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
