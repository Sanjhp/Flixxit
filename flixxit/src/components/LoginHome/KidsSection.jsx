import React from "react";
import "./LoginHome.scss";
import kidsBackground from "../../assets/kids.png";
import CarouselSlider from "../Home/CarouselSlider";

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
            <CarouselSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsSection;
