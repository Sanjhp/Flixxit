import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CarouselSlider.css";

const CarouselSlider = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            params: {
              api_key: "634e2f77ea5af8af8758e53e75fe8937", // Replace with your TMDB API key
            },
          }
        );

        if (response.status === 200) {
          // Slice the array to include only the first 8 items
          setTrendingMovies(response.data.results.slice(0, 6));
        } else {
          console.error(
            "Failed to fetch trending movies:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Failed to fetch trending movies:", error.message);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="movie-card-container">
      {trendingMovies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Trending Movie ${movie.title}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CarouselSlider;
