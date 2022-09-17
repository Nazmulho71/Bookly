import React, { Fragment, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateReviewModal from "./CreateReviewModal";
import UpdateReviewModal from "./UpdateReviewModal";
import "../../assets/css/BookReview.css";

function BookReview({ baseUrl, id, reviews }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewModal, setReviewModal] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("token");
  const decoded = jwt_decode(token);

  return (
    <div className="bookReview">
      <div>
        <h3>Customer reviews</h3>
        <Button
          variant="outlined"
          sx={{ color: "#61cef7", textTransform: "none" }}
          onClick={() => setReviewModal(true)}
        >
          Write a customer review
        </Button>
      </div>
      {reviewModal && (
        <CreateReviewModal
          open={reviewModal}
          handleClose={() => setReviewModal(false)}
          baseUrl={baseUrl}
          token={token}
          id={id}
          comment={comment}
          setComment={setComment}
          rating={rating}
          setRating={setRating}
        />
      )}
      <hr />

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, i) => (
          <Fragment key={i}>
            <div>
              <div>
                <AccountCircleIcon />
                <span>{review.user.name}</span>
                <Rating
                  defaultValue={review.rating}
                  precision={0.1}
                  size="small"
                  readOnly
                  sx={{ margin: 0 }}
                />
                <p
                  style={{
                    margin: "0 0 0 10px",
                    color: "#999999",
                    fontSize: 16,
                  }}
                >
                  {moment(review.date).startOf("seconds").fromNow()}
                </p>
              </div>
              {review.user._id === decoded._id && (
                <UpdateReviewModal
                  baseUrl={baseUrl}
                  token={token}
                  review={review}
                  comment={comment}
                  setComment={setComment}
                />
              )}
            </div>

            <p>{review.comment}</p>
          </Fragment>
        ))
      )}
    </div>
  );
}

export default BookReview;
