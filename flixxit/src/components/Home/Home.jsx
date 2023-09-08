import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import movie1 from "../../assets/banner1.png";
import CarouselSlider from "./CarouselSlider";

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
            <Link to="/signin">
              <button>Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      {/* New Section: Latest Releases */}
      <div className="latest-releases">
        <div className="section-header">
          <h2>Watch the latest cinema releases on Flixxit</h2>
          <div className="button-container">
            <button className="buttons">JOIN NOW</button>
            <button className="buttons">VIEW ALL</button>
          </div>
        </div>

        {/* Placeholder Carousel */}
        <div className="movie-carousel">
          <CarouselSlider />
        </div>
      </div>
    </div>
  );
};

export default Home;
