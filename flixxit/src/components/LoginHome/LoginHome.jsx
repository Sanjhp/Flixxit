import React, { useEffect, useState } from "react";
import "./LoginHome.css";
// import RecommendedForYou from "./RecommendedForYou";
// import ContinueWatching from "./ContinueWatching";
import TopFiveItems from "./TopFiveItems";
import RecommendationSection from "./RecommendationSection";
import DocumentarySection from "./Documentary";
import KidsSection from "./KidsSection";
import { fetchTrendingMovies } from "../utils/tmdb"; // Import the API function

const LoginHome = () => {
  const [trendingMovie, setTrendingMovie] = useState(null);

  useEffect(() => {
    // Fetch trending movie data from TMDb using the API function
    const fetchTrending = async () => {
      const trendingMovieInfo = await fetchTrendingMovies();

      if (trendingMovieInfo) {
        setTrendingMovie(trendingMovieInfo);
      }
    };

    fetchTrending();
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

      {/* Recommended for You section */}
      {/* <RecommendedForYou /> */}

      {/* Continue Watching Section */}
      {/* <ContinueWatching /> */}

      {/* Top 10 Items Section */}
      <TopFiveItems />

      {/* Kids Section  */}
      <KidsSection />

      {/* Documentary section  */}
      <DocumentarySection />

      {/* Recommendation Section */}
      <RecommendationSection />
    </div>
  );
};

export default LoginHome;
