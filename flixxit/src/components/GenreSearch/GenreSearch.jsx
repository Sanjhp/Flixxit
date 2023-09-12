import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom"; // Import useLocation and Link
import "../SeeAll/ViewAll.css";
import Pagination from "../SeeAll/pagination";

const GenreSearch = () => {
  const imagesPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [imageList, setImageList] = useState([]);
  const location = useLocation(); // Get the current location including query parameters

  // Function to fetch movie images by genre from TMDB
  const fetchMovieImagesByGenre = async (genreId) => {
    try {
      const apiKey = "634e2f77ea5af8af8758e53e75fe8937";
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${currentPage}`
      );
      const movies = response.data.results;
      const movieImages = movies.map((movie) => {
        return `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      });
      setImageList(movieImages);
    } catch (error) {
      console.error("Error fetching movie images by genre from TMDB:", error);
    }
  };

  useEffect(() => {
    // Parse the genre ID from the query parameter
    const params = new URLSearchParams(location.search);
    const genreId = params.get("query");

    // Fetch movie images by genre when the page or genre changes
    fetchMovieImagesByGenre(genreId);
  }, [currentPage, location]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="view">
      <div className="movie-library">
        <div className="movie-list">
          {imageList.map((imageUrl, index) => (
            <Link
              to={`/movie-details/${index + 1}`} // Include the movie ID in the URL
              key={index}
              className="movie-card-link" // Add a class for styling (optional)
            >
              <div className="movie-card">
                <img src={imageUrl} alt={`Movie Poster ${index}`} />
              </div>
            </Link>
          ))}
        </div>
        <Pagination
          totalPages={imagesPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GenreSearch;
