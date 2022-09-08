import React, { Fragment, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReviewModal from "./ReviewModal";
import "../assets/css/BookReview.css";

function BookReview({ baseUrl, id, reviews }) {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cookies = new Cookies();
  const token = cookies.get("token");

  const createComment = async () => {
    let data = JSON.stringify({ comment });
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
          onClick={handleOpen}
        >
          Write a customer review
        </Button>
      </div>
      <ReviewModal
        open={open}
        handleClose={handleClose}
        comment={comment}
        setComment={setComment}
        createComment={createComment}
      />
      <hr />

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, i) => (
          <Fragment key={i}>
            <div>
              <AccountCircleIcon />
              <span>{review.user.name}</span>
            </div>
            <p>{review.comment}</p>
          </Fragment>
        ))
      )}
    </div>
  );
}

export default BookReview;
