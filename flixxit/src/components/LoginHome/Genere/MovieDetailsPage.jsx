// MovieDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../utils/tmdb"; // Import your function for fetching movie details
import MovieDetails from "./MovieDetails"; // Import the MovieDetails component

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId); // Use your fetch function here
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    fetchDetails();
  }, [movieId]);

  return (
    <div className="movie-details-page">
      {movieDetails && <MovieDetails movie={movieDetails} />}
    </div>
  );
};

export default MovieDetailsPage;
