import React from "react";
import "./MovieDetails.css";

const MovieDetails = ({ movie, reviews }) => {
  console.log(movie, reviews);

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
              <h3>
                Author: &nbsp;
                {review.author}
              </h3>
              <br />
              {review.content}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
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
        </div>
      </div>
      {renderReviews()}
    </div>
  );
};

export default MovieDetails;
