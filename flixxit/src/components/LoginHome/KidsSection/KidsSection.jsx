import React from "react";
import "./KidsSection.css";
import kidsBackground from "../../../assets/kids.png";
import { Link } from "react-router-dom";
import Carousal from "../Carousal/Carousal";

const KidsSection = () => {
  return (
    <div className="kids">
      <h2 className="kids-heading">Kids Section</h2>
      <div
        className="kids-section"
        style={{ backgroundImage: `url(${kidsBackground})` }}
      >
        <div className="kids-content">
          <div className="kids-movie-carousel">
            <Link to="/kids-movies">
              <Carousal />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsSection;
