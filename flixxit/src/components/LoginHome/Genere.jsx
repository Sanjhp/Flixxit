import React, { useEffect, useState } from "react";
import "./LoginHome.css";
import { fetchTrendingMovies, fetchMoviesByGenre } from "../utils/tmdb"; // Import the API functions for fetching trending and genre-based movies

const Genere = () => {
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);

  useEffect(() => {
    // Fetch trending movie data from TMDb using the API function
    const fetchTrending = async () => {
      const trendingMovieInfo = await fetchTrendingMovies();

      if (trendingMovieInfo) {
        setTrendingMovie(trendingMovieInfo);
      }
    };

    // Fetch genre-based movie data from TMDb using the API function
    const fetchGenreMovies = async () => {
      const genreMoviesInfo = await fetchMoviesByGenre("YOUR_GENRE_ID_HERE"); // Replace with the actual genre ID

      if (genreMoviesInfo) {
        setGenreMovies(genreMoviesInfo.results);
      }
    };

    fetchTrending();
    fetchGenreMovies();
  }, []);

  return (
    <div className="home-container">
      {trendingMovie && (
        <div
          className="movie-banner"
          style={{
            background: `url(${trendingMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="banner-content">
            <h1 className="movie-title">{trendingMovie.title}</h1>
            <p className="movie-description">{trendingMovie.description}</p>
            <button className="play-button">
              <i className="fas fa-play"></i> Play Now
            </button>
          </div>
        </div>
      )}

      {/* Movie Cards Section */}
      <div className="movie-cards">
        {genreMovies.map((movie, index) => (
          <div
            className="movie-card"
            key={index}
            data-movie-title={movie.title}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genere;
