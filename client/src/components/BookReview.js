import React, { Fragment } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../assets/css/BookReview.css";

function BookReview({ book }) {
  return (
    <div className="bookReview">
      <h3>Customer reviews</h3>
      <hr />
      {book.reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        book.reviews.map((review, i) => (
          <Fragment key={i}>
            <div>
              <AccountCircleIcon />
              <span>User</span>
            </div>
            <p>{review.comment}</p>
          </Fragment>
        ))
      )}
    </div>
  );
}

export default BookReview;
