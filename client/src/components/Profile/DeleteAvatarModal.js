import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function DeleteAvatarModal({
  deleteModalOpen,
  setDeleteModalOpen,
  updateUser,
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
      open={deleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2, fontFamily: "Quicksand", fontWeight: 700 }}
        >
          Are you sure you want to delete your photo?
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 1,
            width: "100%",
            boxShadow: "none",
            background: "#f2709b",
            textTransform: "none",
          }}
          onClick={() => updateUser()}
        >
          Delete
        </Button>
      </Box>
    </Modal>
  );
}

export default DeleteAvatarModal;
