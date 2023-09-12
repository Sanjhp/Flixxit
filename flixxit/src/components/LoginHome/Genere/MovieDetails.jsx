import React, { useState } from "react";
import "./MovieDetails.css";
import { FaThumbsUp, FaThumbsDown, FaPlayCircle } from "react-icons/fa";

const MovieDetails = ({ movie, reviews, cast }) => {
  console.log(movie, reviews, cast);

  const [expandedReviewIndex, setExpandedReviewIndex] = useState(-1);

  const toggleReviewVisibility = (index) => {
    if (expandedReviewIndex === index) {
      setExpandedReviewIndex(-1); // Collapse the currently expanded review
    } else {
      setExpandedReviewIndex(index); // Expand the clicked review
    }
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      return <p>No reviews available.</p>;
    }

    return (
      <div className="reviews">
        <h2>Reviews:</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <h3>Author: {review.author}</h3>
              <br />
              {index === expandedReviewIndex
                ? review.content
                : `${review.content.substring(0, 300)}...`}
              {review.content.length > 300 && (
                <button onClick={() => toggleReviewVisibility(index)}>
                  {index === expandedReviewIndex ? "Show Less" : "Show More"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderCast = () => {
    if (cast.length === 0) {
      return <p>No cast information available.</p>;
    }

    return (
      <div className="cast">
        <h2>Cast:</h2>
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <div className="actor-info">
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={`${actor.name}'s profile`}
                  />
                )}
                <div className="actor-details">
                  <h3>{actor.name}</h3>
                  <p>Character: {actor.character}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="movie-info-container">
      <div className="movie-details">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>User Score:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Tagline:</strong> {movie.tagline}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>

          <p>
            <strong>Original Language:</strong> {movie.original_language}
          </p>
          {/* Add more details as needed */}
          <div className="movie-actions">
            <button className="action-button">
              <FaThumbsUp className="action-icon" />
            </button>
            <button className="action-button">
              <FaThumbsDown className="action-icon" />
            </button>
            <button className="action-button">
              <FaPlayCircle className="action-icon" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>
      <div className="movie-about">
        {renderReviews()}
        {renderCast()}
      </div>
    </div>
  );
};

export default MovieDetails;
