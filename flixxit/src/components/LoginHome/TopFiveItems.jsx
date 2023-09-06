/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./LoginHome.scss"; // Import your SCSS file

const TopFiveItems = () => {
  const topFiveItems = [
    {
      number: 1,
      image: "image1.jpg",
    },
    {
      number: 2,
      image: "image2.jpg",
    },
    {
      number: 3,
      image: "image3.jpg",
    },
    {
      number: 4,
      image: "image4.jpg",
    },
    {
      number: 5,
      image: "image5.jpg",
    },

    // Add more items with numbers and images here
  ];

  return (
    <div className="recommended-section">
      <h2 className="recommended-heading">Top 5 Of Month</h2>
      <div className="double-line-numbers">
        {topFiveItems.map((item, index) => (
          <div className="number-container" key={index}>
            <div className="number">#{item.number}</div>
            <img src={item.image} className="number-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFiveItems;
