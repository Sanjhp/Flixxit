import React from "react";
import "./Home.scss";
import movie1 from "../../assets/banner1.png";
// import movie1 from "../../assets/collage3.jpeg";

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <img
          src={movie1}
          alt="Banner"
          style={{
            // maxWidth: "100%",
            maxHeight: "75vh",
            width: "auto",
            height: "auto",
            objectFit: "cover",
          }}
        />
        <div className="content">
          <h1>Welcome to Flixxit</h1>
          <p>Your gateway to unlimited entertainment</p>
          <div className="email-input">
            <input type="email" placeholder="Enter your email" />
            <button>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
