import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Rating from "@mui/material/Rating";
import "../assets/css/BookDescription.css";

function BookDescription({ rating, description }) {
  const [showAll, setShowAll] = useState(false);

  const ShortDescription = ({ content, limit }) => {
    if (content.length <= limit) {
      return <p>{content}</p>;
    }
    if (showAll) {
      return (
        <p>
          {content}&nbsp;
          <span onClick={() => setShowAll(false)}>
            <KeyboardArrowUpIcon /> Read less
          </span>
        </p>
      );
    }
    const toShow = content.substring(0, limit) + "...";
    return (
      <p>
        {toShow}&nbsp;
        <span onClick={() => setShowAll(true)}>
          <KeyboardArrowDownIcon /> Read more
        </span>
      </p>
    );
  };

  return (
    <div className="bookDescription">
      <div>
        <h3>Description</h3>
        <div>
          <span>{rating} out of 5</span>
          <Rating defaultValue={rating} precision={0.1} readOnly size="large" />
        </div>
      </div>
      <hr />
      <ShortDescription content={description} limit={700} />
    </div>
  );
}

export default BookDescription;
