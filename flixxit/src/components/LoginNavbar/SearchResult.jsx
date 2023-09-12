// SearchResult.js

import React from "react";
import styles from "./SearchResult.css"; // Import the CSS module

const SearchResult = ({ results }) => {
  return (
    <div className={styles["search-results"]}>
      {results.map((result) => (
        <div key={result.id} className={styles["result-card"]}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
            alt={result.title}
            className={styles["result-image"]}
          />
          <div className={styles["result-details"]}>
            <h3 className={styles["result-title"]}>{result.title}</h3>
            <p className={styles["result-overview"]}>{result.overview}</p>
            <p className={styles["result-rating"]}>
              Rating: {result.vote_average}
            </p>
            <p className={styles["result-actors"]}>
              Actors: {/* Add actors data here */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
