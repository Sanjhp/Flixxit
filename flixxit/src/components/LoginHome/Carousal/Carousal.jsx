import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Carousal.css";
import { Link } from "react-router-dom"; // Import Link from React Router

const Carousal = ({ genre }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = "634e2f77ea5af8af8758e53e75fe8937";

    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`
      )
      .then((response) => {
        if (response.data.results) {
          setMovies(response.data.results);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies by genre:", error);
        return null;
      });
  }, [genre]);

  return (
    <div className="movie-carousel">
      {movies.length > 0 && (
        <div className="carousel-container">
          <div className="carousel">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie-details/${movie.id}`} // Link to the movie details page
                className="movie-card" // Apply styles here as needed
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousal;
