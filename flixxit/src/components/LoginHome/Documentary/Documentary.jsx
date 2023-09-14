import React from "react";
import "./Documentary.css"; // Import your SCSS file
import documentaryImage from "../../../assets/documentary.png";
import Carousal from "../Carousal/Carousal";

const DocumentarySection = () => {
  return (
    <div>
      <div
        className="documentary-section"
        style={{
          backgroundImage: `url(${documentaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="documentary-content">
          <div className="documentary-text">
            <h2 className="documentary-heading">Documentaries</h2>
            <p className="documentary-description">
              Explore a world of knowledge and discovery with our collection of
              documentaries.
            </p>
          </div>
          <Carousal />
        </div>
      </div>
    </div>
  );
};

export default DocumentarySection;
