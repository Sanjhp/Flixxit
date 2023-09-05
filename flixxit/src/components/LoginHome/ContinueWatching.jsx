import React from "react";
import PropTypes from "prop-types";
import "./LoginHome.scss"; // Import your SCSS file

const ContinueWatching = ({ movies }) => {
  return (
    <div className="continue-watching-section">
      <h2 className="continue-watching-heading">Continue Watching</h2>
      <div className="movie-carousel">
        <div className="carousel-container">
          {/* Left Arrow */}
          <div className="carousel-arrow left-arrow">
            <i className="fas fa-chevron-left"></i>
          </div>

          {/* Movie Cards */}
          <div className="movie-cards">
            {movies.map((movie, index) => (
              <div className="movie-card" key={index}>
                {/* Play Icon */}
                <div className="play-icon">
                  <i className="fas fa-play"></i>
                </div>

                {/* Movie Image */}
                <img
                  src={movie.imageUrl}
                  alt={`Movie ${index + 1}`}
                  className="movie-image"
                />

                {/* Movie Title */}
                <h4 className="movie-title">{movie.title}</h4>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div className="carousel-arrow right-arrow">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

ContinueWatching.propTypes = {
  movies: PropTypes.array.isRequired, // Pass the continue watching movies as a prop
};

export default ContinueWatching;
