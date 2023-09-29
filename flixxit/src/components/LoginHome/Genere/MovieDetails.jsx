// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import "./MovieDetails.css";
// import { FaThumbsUp, FaThumbsDown, FaPlayCircle } from "react-icons/fa";

// const MovieDetails = ({ movie, reviews, cast, video }) => {
//   console.log(movie, reviews, cast, video);

//   const [expandedReviewIndex, setExpandedReviewIndex] = useState(-1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedVideoKey, setSelectedVideoKey] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [videoNotAvailableAlertShown, setVideoNotAvailableAlertShown] =
//     useState(false);

//   const handleLike = () => {
//     setSelectedOption("like");
//     // You can also send the like to TMDB here
//   };

//   const handleDislike = () => {
//     setSelectedOption("dislike");
//     // You can also send the dislike to TMDB here
//   };

//   const toggleReviewVisibility = (index) => {
//     if (expandedReviewIndex === index) {
//       setExpandedReviewIndex(-1); // Collapse the currently expanded review
//     } else {
//       setExpandedReviewIndex(index); // Expand the clicked review
//     }
//   };

//   const openModal = (videoKey) => {
//     setIsModalOpen(true);
//     setSelectedVideoKey(videoKey);

//     // Check if videoKey is not available and the alert has not been shown yet
//     if (!videoKey && !videoNotAvailableAlertShown) {
//       alert("Video not available");
//       setVideoNotAvailableAlertShown(true);
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     // setSelectedVideoKey(null);
//   };

//   const renderReviews = () => {
//     if (reviews.length === 0) {
//       return (
//         <div className="reviews no-reviews">
//           <p>No reviews available.</p>
//         </div>
//       );
//     }

//     return (
//       <div className="reviews">
//         <h2>Reviews:</h2>
//         <ul>
//           {reviews.map((review, index) => (
//             <li key={index}>
//               <h3>Author: {review.author}</h3>
//               <br />
//               {index === expandedReviewIndex
//                 ? review.content
//                 : `${review.content.substring(0, 300)}...`}
//               {review.content.length > 300 && (
//                 <button onClick={() => toggleReviewVisibility(index)}>
//                   {index === expandedReviewIndex ? "Show Less" : "Show More"}
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   const renderCast = () => {
//     if (cast.length === 0) {
//       return <p>No cast information available.</p>;
//     }

//     return (
//       <div className="cast">
//         <h2>Cast:</h2>
//         <ul>
//           {cast.map((actor) => (
//             <li key={actor.id}>
//               <div className="actor-info">
//                 {actor.profile_path && (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
//                     alt={`${actor.name}'s profile`}
//                   />
//                 )}
//                 <div className="actor-details">
//                   <h3>{actor.name}</h3>
//                   <p>Character: {actor.character}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
//   const renderVideo = () => {
//     if (!selectedVideoKey) {
//       return null;
//     }

//     return isModalOpen ? (
//       <div className="video-modal">
//         <div className="video-modal-content">
//           <span className="close-button" onClick={closeModal}>
//             &times;
//           </span>
//           <iframe
//             title="YouTube Video"
//             width="560"
//             height="315"
//             src={`https://www.youtube.com/embed/${selectedVideoKey}`}
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </div>
//     ) : null;
//   };

//   return (
//     <div className="movie-info-container">
//       <div className="movie-details">
//         <div className="movie-poster">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title}
//           />
//         </div>
//         <div className="movie-info">
//           <h1>{movie.title}</h1>
//           <p>
//             <strong>Release Date:</strong> {movie.release_date}
//           </p>

//           <p>
//             <strong>Genres:</strong>{" "}
//             {movie.genres.map((genre) => genre.name).join(", ")}
//           </p>
//           <p>
//             <strong>Runtime:</strong> {movie.runtime} minutes
//           </p>
//           <p>
//             <strong>User Score:</strong> {movie.vote_average}
//           </p>
//           <p>
//             <strong>Tagline:</strong> {movie.tagline}
//           </p>
//           <p>
//             <strong>Overview:</strong> {movie.overview}
//           </p>

//           <p>
//             <strong>Original Language:</strong> {movie.original_language}
//           </p>
//           {/* Add more details as needed */}
//           <div className="movie-actions">
//             <button
//               className={`action-button ${
//                 selectedOption === "like" ? "selected" : ""
//               }`}
//               onClick={handleLike}
//             >
//               <FaThumbsUp className="action-icon like" />
//             </button>
//             <button
//               className={`action-button ${
//                 selectedOption === "dislike" ? "selected" : ""
//               }`}
//               onClick={handleDislike}
//             >
//               <FaThumbsDown className="action-icon dislike" />
//             </button>
//             <button
//               className="action-button"
//               onClick={() => openModal(video[0]?.key)}
//             >
//               <FaPlayCircle className="action-icon" />
//               <span>Watch Trailer</span>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="movie-about">
//         {renderReviews()}
//         {renderCast()}
//         {renderVideo()}
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./MovieDetails.css";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaPlayCircle,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

const MovieDetails = ({ movie, reviews, cast, video }) => {
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [videoNotAvailableAlertShown, setVideoNotAvailableAlertShown] =
    useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainer = useRef(null);

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
    // setSelectedVideoKey(null);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoContainer.current) {
        if (videoContainer.current.requestFullscreen) {
          videoContainer.current.requestFullscreen();
        } else if (videoContainer.current.mozRequestFullScreen) {
          videoContainer.current.mozRequestFullScreen();
        } else if (videoContainer.current.webkitRequestFullscreen) {
          videoContainer.current.webkitRequestFullscreen();
        } else if (videoContainer.current.msRequestFullscreen) {
          videoContainer.current.msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    // Add an event listener to detect changes in fullscreen mode
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);
    document.addEventListener(
      "webkitfullscreenchange",
      fullscreenChangeHandler
    );
    document.addEventListener("mozfullscreenchange", fullscreenChangeHandler);
    document.addEventListener("MSFullscreenChange", fullscreenChangeHandler);

    return () => {
      // Remove event listeners when the component unmounts
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
      document.removeEventListener(
        "webkitfullscreenchange",
        fullscreenChangeHandler
      );
      document.removeEventListener(
        "mozfullscreenchange",
        fullscreenChangeHandler
      );
      document.removeEventListener(
        "MSFullscreenChange",
        fullscreenChangeHandler
      );
    };
  }, []);

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
      <div className="video-modal">
        <div className="video-modal-content" ref={videoContainer}>
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
          <button className="fullscreen-button" onClick={toggleFullscreen}>
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
          <iframe
            title="YouTube Video"
            width={isFullscreen ? "100%" : "560"}
            height={isFullscreen ? "100%" : "315"}
            src={`https://www.youtube.com/embed/${selectedVideoKey}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
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
