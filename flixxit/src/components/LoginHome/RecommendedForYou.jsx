// RecommendedForYou.jsx

import React from "react";
import PropTypes from "prop-types";
import "./LoginHome.css"; // Import your SCSS file

const RecommendedForYou = ({ movies }) => {
  const recommendedMovies = [
    { title: "Movie 1", image: "movie1.jpg" },
    { title: "Movie 2", image: "movie2.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },

    // Add more movie data
  ];

  return (
    <div className="recommended-section">
      <h2 className="recommended-heading">Recommended for You</h2>
      <div className="movie-carousel">
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
                  src={movie.imageUrl} // Use the appropriate URL for the movie image
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
    </div>
  );
};

RecommendedForYou.propTypes = {
  movies: PropTypes.array.isRequired, // Pass the recommended movies as a prop
};

export default RecommendedForYou;
