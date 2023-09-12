// MovieDetails.js
import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default MovieDetails;
