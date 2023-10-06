import React, { useState, useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import Video.js styles
import "videojs-youtube"; // Import the Video.js YouTube plugin
import { FaThumbsUp, FaThumbsDown, FaPlayCircle } from "react-icons/fa";
import "./MovieDetails.css"; // Import your custom CSS

const MovieDetails = ({ movie, reviews, cast, video }) => {
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [videoNotAvailableAlertShown, setVideoNotAvailableAlertShown] =
    useState(false);

  // Create a ref to hold the video player element
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    // Check if a video key is available
    if (selectedVideoKey) {
      // Initialize Video.js player
      const player = videojs(videoPlayerRef.current, {
        techOrder: ["youtube"], // Use the YouTube tech
        autoplay: false, // Set to true if you want the video to autoplay
        sources: [
          {
            type: "video/youtube",
            src: `https://www.youtube.com/watch?v=${selectedVideoKey}`,
          },
        ],
      });

      return () => {
        // Dispose of the Video.js player when the component unmounts
        if (player) {
          player.dispose();
        }
      };
    }
  }, [selectedVideoKey]);

  const handleLike = () => {
    setSelectedOption("like");
    // You can also send the like to TMDB here
  };

  const handleDislike = () => {
    setSelectedOption("dislike");
    // You can also send the dislike to TMDB here
  };

  const toggleReviewVisibility = (index) => {
    if (expandedReviewIndex === index) {
      setExpandedReviewIndex(-1); // Collapse the currently expanded review
    } else {
      setExpandedReviewIndex(index); // Expand the clicked review
    }
  };

  const openModal = (videoKey) => {
    setIsModalOpen(true);
    setSelectedVideoKey(videoKey);

    // Check if videoKey is not available and the alert has not been shown yet
    if (!videoKey && !videoNotAvailableAlertShown) {
      alert("Video not available");
      setVideoNotAvailableAlertShown(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderReviews = () => {
    if (reviews.length === 0) {
      return (
        <div className="reviews no-reviews">
          <p>No reviews available.</p>
        </div>
      );
    }

    return (
      <div className="reviews">
        <h2>Reviews:</h2>
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <h3>Author: {review.author}</h3>
              <br />
              {index === expandedReviewIndex
                ? review.content
                : `${review.content.substring(0, 300)}...`}
              {review.content.length > 300 && (
                <button onClick={() => toggleReviewVisibility(index)}>
                  {index === expandedReviewIndex ? "Show Less" : "Show More"}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderCast = () => {
    if (cast.length === 0) {
      return <p>No cast information available.</p>;
    }

    return (
      <div className="cast">
        <h2>Cast:</h2>
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <div className="actor-info">
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={`${actor.name}'s profile`}
                  />
                )}
                <div className="actor-details">
                  <h3>{actor.name}</h3>
                  <p>Character: {actor.character}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderVideo = () => {
    if (!selectedVideoKey) {
      return null;
    }

    return isModalOpen ? (
      <div
        className="video-modal"
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 999,
        }}
      >
        <div
          // className="video-modal-content"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <video
            ref={videoPlayerRef} // Set the ref to the video player element
            className=" vjs-default-skin"
            controls
            width="95%" // Set the width to 100% to make it full width
            height="95%" // Set the height to 100% to make it full height
          />
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="movie-info-container">
      <div className="movie-details">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>User Score:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Tagline:</strong> {movie.tagline}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>

          <p>
            <strong>Original Language:</strong> {movie.original_language}
          </p>
          {/* Add more details as needed */}
          <div className="movie-actions">
            <button
              className={`action-button ${
                selectedOption === "like" ? "selected" : ""
              }`}
              onClick={handleLike}
            >
              <FaThumbsUp className="action-icon like" />
            </button>
            <button
              className={`action-button ${
                selectedOption === "dislike" ? "selected" : ""
              }`}
              onClick={handleDislike}
            >
              <FaThumbsDown className="action-icon dislike" />
            </button>
            <button
              className="action-button"
              onClick={() => openModal(video[0]?.key)}
            >
              <FaPlayCircle className="action-icon" />
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>
      <div className="movie-about">
        {renderReviews()}
        {renderCast()}
        {renderVideo()}
      </div>
    </div>
  );
};

export default MovieDetails;
