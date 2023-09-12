import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <h1>404 Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/">Go back to home page</Link>
    </div>
  );
};

export default ErrorPage;
