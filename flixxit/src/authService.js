// authService.js

const API_URL = "http://localhost:5000";

export const login = async (email, password, rememberMe) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const { token, refreshToken } = data; // Change these property names as per your server response

      // Store tokens in localStorage
      localStorage.setItem("token", token);

      if (rememberMe) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      return true; // Login successful
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData.error);
      return false; // Login failed
    }
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export const logout = () => {
  // Remove tokens from localStorage on logout
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => {
  // Get the access token from localStorage
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  // Check if a user is authenticated based on the presence of the access token
  const accessToken = getAccessToken();
  return !!accessToken;
};

export const getRefreshToken = () => {
  // Get the refresh token from localStorage
  return localStorage.getItem("refreshToken");
};
