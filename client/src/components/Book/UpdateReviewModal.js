import React, { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

function EditCommentModal({ token, review, comment, setComment }) {
  const [commentModalOpen, setCommentModalOpen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const updateReview = () => {
    let data = JSON.stringify({ comment, rating: review.rating });
    let config = {
      method: "put",
      url: `/api/books/${review.book}/reviews/${review._id}`,
      headers: { "X-Auth-Token": token, "Content-Type": "application/json" },
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

  const deleteReview = () => {
    let config = {
      method: "delete",
      url: `/api/books/${review.book}/reviews/${review._id}`,
      headers: { "X-Auth-Token": token },
    };

    axios(config)
      .then(function (res) {
        window.location.reload();
      })
      .catch(function (res) {
        console.log(res);
      });
  };

  return (
    <>
      <div>
        <Button
          sx={{ color: "#61cef7", textTransform: "none" }}
          onClick={() => setCommentModalOpen(true)}
        >
          <EditIcon
            sx={{
              mr: 1,
              fontSize: 18,
              textTransform: "",
            }}
          />{" "}
          Edit Comment
        </Button>
      </div>

      {commentModalOpen && (
        <Modal
          open={commentModalOpen}
          onClose={() => setCommentModalOpen(false)}
          aria-labelledby="modal-modal-title"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2, fontFamily: "Quicksand", fontWeight: 700 }}
            >
              Edit Comment
            </Typography>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <Button
              variant="contained"
              sx={{
                mt: 1,
                width: "100%",
                boxShadow: "none",
                background: "#5669df",
                textTransform: "none",
              }}
              type="submit"
              onClick={() => updateReview()}
            >
              Update
            </Button>

            <Button
              sx={{
                mt: 1,
                mb: -1.6,
                color: "#f2709b",
                width: "100%",
                boxShadow: "none",
                textTransform: "none",
              }}
              type="submit"
              onClick={() => deleteReview()}
            >
              Delete Comment
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
