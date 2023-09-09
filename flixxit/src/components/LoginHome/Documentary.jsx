import React from "react";
import "./LoginHome.css"; // Import your SCSS file
import documentaryImage from "../../assets/documentary.png";

const DocumentarySection = () => {
  const recommendedMovies = [
    { title: "Movie 1", image: "movie1.jpg" },
    { title: "Movie 2", image: "movie2.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 4", image: "movie4.jpg" },

    // Add more movie data
  ];
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
          <h2 className="documentary-heading">Documentaries</h2>
          <p className="documentary-description">
            Explore a world of knowledge and discovery with our collection of
            documentaries.
          </p>
        </div>
      </div>
      <div className="carousel-container">
        {/* Left navigation arrow */}
        <div className="carousel-arrow left-arrow">
          <i className="fas fa-arrow-left"></i>
        </div>

        {/* Movie cards */}
        <div className="movie-cards">
          {recommendedMovies.map((movie, index) => (
            <div className="movie-card" key={index}>
              {/* Movie card content */}
              <img
                src={movie.imageUrl}
                alt={`Movie ${index + 1}`}
                className="movie-image"
              />
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-description">{movie.description}</p>
            </div>
          ))}
        </div>

        {/* Right navigation arrow */}
        <div className="carousel-arrow right-arrow">
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

export default DocumentarySection;
