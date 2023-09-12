import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MovieCarousel.css";
import ErrorPage from "../Error";

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual TMDB API key
    const apiKey = "634e2f77ea5af8af8758e53e75fe8937";

    // Fetch popular movies from TMDB
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => {
        if (response.data.results) {
          setMovies(response.data.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        return <ErrorPage />;
      });
  }, []);

  return (
    <div className="movie-carousel">
      {movies.length > 0 && (
        <div className="carousel-container">
          <div className="carousel">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
