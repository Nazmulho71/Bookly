import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Rating from "@mui/material/Rating";
import "../assets/css/BookDescription.css";

function BookDescription({ book }) {
  const [showAll, setShowAll] = useState(false);

  const ShortDescription = ({ content, limit }) => {
    if (content.length <= limit) {
      return <div>{content}</div>;
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
          <span>{book.rating ? book.rating : "0"} out of 5</span>
          <Rating
            name="half-rating-read"
            defaultValue={book.rating}
            precision={0.1}
            readOnly
          />
        </div>
      </div>
      <hr />
      <ShortDescription content={book.description} limit={700} />
    </div>
  );
}

export default BookDescription;
