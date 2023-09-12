import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetails from "./MovieDetails";

const API_KEY = "634e2f77ea5af8af8758e53e75fe8937"; // Replace with your TMDb API key

const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (response.status === 200) {
      return response.data.results;
    }
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return [];
  }
};

const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviews = await fetchMovieReviews(movieId);
        setMovieReviews(reviews);
      } catch (error) {
        console.error("Error fetching movie reviews: ", error);
      }
    };

    fetchDetails();
    fetchReviews();
  }, [movieId]);

  return (
    <div className="movie-details-page">
      {movieDetails && (
        <MovieDetails movie={movieDetails} reviews={movieReviews} />
      )}
    </div>
  );
};

export default MovieDetailsPage;
