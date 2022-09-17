import React from "react";
import Rating from "@mui/material/Rating";
import ShortDescription from "../Common/ShortDescription";
import "../../assets/css/BookDescription.css";

function BookDescription({ rating, description }) {
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
