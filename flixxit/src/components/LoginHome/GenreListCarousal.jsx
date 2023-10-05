// MovieGenres.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousal from "./Carousal/Carousal";

const MovieGenres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Function to fetch movie genres from TMDB API
    const fetchMovieGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=634e2f77ea5af8af8758e53e75fe8937`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching movie genres:", error);
      }
    };

    // Call the function to fetch movie genres when the component mounts
    fetchMovieGenres();
  }, []);

  return (
    <div>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id} className="text-lg mb-2 cursor-pointer">
            <h2 className="kids-heading"> {genre.name}</h2>
            <Carousal genre={genre.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieGenres;
