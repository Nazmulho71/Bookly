import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../assets/css/ReviewModal.css";

function ReviewModal({
  open,
  handleClose,
  comment,
  setComment,
  createComment,
}) {
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontFamily: "Quicksand", fontWeight: 700 }}
        >
          Review this book
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, mb: 1, fontFamily: "Quicksand", fontWeight: 500 }}
        >
          Share your thoughts with other customers
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
            background: "#5669df ",
            textTransform: "none",
          }}
          type="submit"
          onClick={() => createComment()}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
}

export default ReviewModal;