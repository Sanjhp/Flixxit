import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AboutMovie.css";
import { fetchMovieDetails, fetchMovieTrailers } from "../utils/tmdb"; // Import API functions for movie details and trailers

const AboutMovie = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    // Fetch movie details from TMDb using the API function
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(movieId);

      if (details) {
        setMovieDetails(details);
      }
    };

    // Fetch movie trailers from TMDb using the API function
    const fetchMovieTrailersData = async () => {
      const trailersData = await fetchMovieTrailers(movieId);

      if (trailersData) {
        setTrailers(trailersData.results);
      }
    };

    fetchDetails();
    fetchMovieTrailersData();
  }, [movieId]);

  return (
    <div className="about-movie-container">
      {movieDetails && (
        <>
          <div className="movie-details">
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={movieDetails.title}
              />
            </div>
            <div className="movie-info">
              <h1>{movieDetails.title}</h1>
              <p>{movieDetails.overview}</p>
              <div className="movie-genres">
                {movieDetails.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
              <p>Release Date: {movieDetails.release_date}</p>
              <p>Runtime: {movieDetails.runtime} minutes</p>
              <p>Popularity: {movieDetails.popularity}</p>
            </div>
          </div>
          <div className="trailers">
            <h2>Trailers</h2>
            <div className="trailer-list">
              {trailers.map((trailer) => (
                <div key={trailer.key} className="trailer">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
          {/* Add sections for cast, reviews, and other details */}
        </>
      )}
    </div>
  );
};

export default AboutMovie;
