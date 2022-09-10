import React, { Fragment, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import moment from "moment";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import ReviewModal from "./ReviewModal";
import EditCommentModal from "./EditCommentModal";
import "../assets/css/BookReview.css";

function BookReview({ baseUrl, id, reviews }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewModal, setReviewModal] = useState(false);
  const [commentModal, setCommentModal] = useState(false);

  const cookies = new Cookies();
  const token = cookies.get("token");
  const decoded = jwt_decode(token);

  const createComment = async () => {
    let data = JSON.stringify({ comment, rating });
    let config = {
      method: "post",
      url: `${baseUrl}/books/${id}/reviews`,
      headers: {
        "X-Auth-Token": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

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
        <ReviewModal
          open={reviewModal}
          handleClose={() => setReviewModal(false)}
          comment={comment}
          setComment={setComment}
          rating={rating}
          setRating={setRating}
          createComment={createComment}
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
                  {/* {moment(review.date).format("MMMM Do YYYY")} */}
                  {moment(review.date).startOf("seconds").fromNow()}
                </p>
              </div>
              {review.user._id === decoded._id && (
                <>
                  <div>
                    <Button
                      sx={{ color: "#61cef7", textTransform: "none" }}
                      onClick={() => setCommentModal(true)}
                    >
                      <EditIcon
                        sx={{
                          mr: 1,
                          fontSize: 18,
                          textTransform: "",
                        }}
                      />{" "}
                      Edit comment
                    </Button>
                  </div>
                  {commentModal && (
                    <EditCommentModal
                      open={commentModal}
                      handleClose={() => setCommentModal(false)}
                    />
                  )}
                </>
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
