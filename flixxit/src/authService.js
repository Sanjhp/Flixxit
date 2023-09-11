// authService.js
const API_URL = "http://your-backend-api-url"; // Replace with your backend API URL

export const login = async (email, password) => {
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
      const { token } = data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      return true; // Login successful
    }

    return false; // Login failed
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export const logout = () => {
  // Remove the token from localStorage on logout
  localStorage.removeItem("token");
};

export const getToken = () => {
  // Get the token from localStorage
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  // Check if a user is authenticated
  const token = getToken();
  return !!token;
};
