import React from "react";
import "./LoginHome.css";
import kidsBackground from "../../assets/kids.png";
import MovieCarousel from "../Carousal/MovieCarousal";

const KidsSection = () => {
  return (
    <div className="kids">
      <h2 className="recommended-heading">Kids Section</h2>
      <div
        className="kids-section"
        style={{ backgroundImage: `url(${kidsBackground})` }}
      >
        <div className="kids-content">
          <div className="kids-movie-carousel">
            <MovieCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsSection;
