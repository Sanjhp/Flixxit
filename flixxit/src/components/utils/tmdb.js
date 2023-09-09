// utils/tmdb.js (a separate file for API-related code)
import axios from "axios";

const API_KEY = "634e2f77ea5af8af8758e53e75fe8937"; // Replace with your TMDb API key

export async function fetchTopMoviesOfWeek() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results.slice(0, 5); // Get the top 5 movies
  } catch (error) {
    throw new Error("Error fetching top movies: " + error.message);
  }
}

export async function fetchKidsMovies() {
  try {
    // Define query parameters to filter kids' movies (e.g., genre, rating)
    const queryParams = {
      with_genres: "16", // Genre ID for Animation
      certification_country: "US", // Certification country (adjust as needed)
      certification: "G", // G-rated movies (adjust as needed)
      sort_by: "popularity.desc", // Sort by popularity in descending order
      page: 1, // Page number
    };

    // Make an API request to get kids' movies
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`,
      { params: queryParams }
    );

    if (response.status !== 200) {
      throw new Error("Error fetching kids' movies");
    }

    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching kids' movies: " + error.message);
  }
}

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    if (response.data.results && response.data.results.length > 0) {
      // Take the first trending movie from the response
      const trendingMovieData = response.data.results[0];

      // Create an object with the required data
      const trendingMovieInfo = {
        title: trendingMovieData.title,
        description: trendingMovieData.overview,
        backdrop_path: `https://image.tmdb.org/t/p/original${trendingMovieData.backdrop_path}`,
      };

      return trendingMovieInfo;
    }
  } catch (error) {
    console.error("Error fetching trending movie:", error);
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return null;
  }
};
