import React from "react";
import "./LoginHome.scss";
import RecommendedForYou from "./RecommendedForYou";
import ContinueWatching from "./ContinueWatching";
import TopFiveItems from "./TopFiveItems";
import RecommendationSection from "./RecommendationSection";

const LoginHome = () => {
  const recommendedMovies = [
    { title: "Movie 1", image: "movie1.jpg" },
    { title: "Movie 2", image: "movie2.jpg" },
    { title: "Movie 3", image: "movie3.jpg" },
    { title: "Movie 4", image: "movie3.jpg" },

    // Add more movie data
  ];

  return (
    <div className="home-container">
      <div className="movie-banner">
        <div className="banner-content">
          <h1 className="movie-title">Movie Title</h1>
          <p className="movie-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            condimentum tortor non ante luctus, vel laoreet justo consectetur.
          </p>
          <button className="play-button">
            <i className="fas fa-play"></i> Play Now
          </button>
        </div>
      </div>
      {/* Recommended for You section */}
      <RecommendedForYou />

      {/* Continue Watching Section */}
      <ContinueWatching movies={recommendedMovies} />

      {/* Top 10 Items Section */}
      <TopFiveItems />

      {/* Recommendation Section */}
      <RecommendationSection />
    </div>
  );
};
export default LoginHome;
