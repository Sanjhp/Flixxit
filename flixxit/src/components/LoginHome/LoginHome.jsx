import React, { useEffect, useRef, useState } from "react";
import "./LoginHome.css";
import { fetchTrendingMovies } from "../utils/tmdb";
import RecommendationSection from "./RecommendationSection/RecommendationSection";
import TopFiveItems from "./TopFiveItems/TopFiveItems";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import MovieGenres from "./GenreListCarousal";
import axios from "axios";
import jwt_decode from "jwt-decode";

const LoginHome = () => {
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoSource, setVideoSource] = useState("");
  const videoRef = useRef(null);

  const [userId, setUserId] = useState("");
  console.log("userId :>> ", userId);
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };
  useEffect(() => {
    getUserIdFromToken();
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      const trendingMovieInfo = await fetchTrendingMovies();

      console.log("Trending Movie Data:", trendingMovieInfo);

      if (trendingMovieInfo) {
        setTrendingMovie(trendingMovieInfo);
      }
    };

    fetchTrending();
  }, []);

  const openVideoModal = (source) => {
    setVideoSource(source);
    setIsVideoModalOpen(true);

    if (userId && trendingMovie.id) {
      axios
        .post("/watchlist/add", {
          userId: userId,
          movieId: trendingMovie.id,
        })
        .then((response) => {
          console.log("Added to watchlist:", response.data);
        })
        .catch((error) => {
          console.error("Error adding to watchlist:", error);
        });
    }
  };

  // Close the modal when the video ends
  const handleVideoEnd = () => {
    setIsVideoModalOpen(false);
    setVideoSource(""); // Clear the video source
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setVideoSource(""); // Clear the video source
  };

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
            <button
              className="play-button"
              onClick={() =>
                openVideoModal(
                  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Update with your video URL
                )
              }
            >
              <i className="fas fa-play"></i> Play Now
            </button>
          </div>
        </div>
      )}

      <TopFiveItems />
      <MovieGenres />
      {isVideoModalOpen && (
        <div
          className="video-modal"
          style={{ width: "100vw", height: "100vh" }}
        >
          <div
            className="video-modal-content"
            style={{ width: "100%", height: "100%" }}
          >
            <span
              className="close-button black"
              onClick={closeVideoModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                cursor: "pointer",
                fontSize: "24px",
                zIndex: 9999, // Ensure the close button is on top
              }}
            >
              &times;
            </span>

            <video
              ref={videoRef}
              className="video-js vjs-default-skin"
              controls
              autoPlay
              onEnded={handleVideoEnd} // Call handleVideoEnd when the video ends
              style={{ width: "100%", height: "100%" }}
            >
              <source src={videoSource} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      <RecommendationSection />
    </div>
  );
};

export default LoginHome;
