import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function UpdateAvatarModal({
  updateModalOpen,
  setUpdateModalOpen,
  setProfilePic,
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
      open={updateModalOpen}
      onClose={() => setUpdateModalOpen(false)}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2, fontFamily: "Quicksand", fontWeight: 700 }}
        >
          Change your Photo
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mb: 1, fontFamily: "Quicksand", fontWeight: 500 }}
        >
          Enter an image URL to change your photo
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            onChange={(e) => setProfilePic(e.target.value)}
            style={{
              width: "80%",
              padding: "8px 20px",
              background: "#eeeeee",
              fontWeight: "500",
              fontSize: "18px",
              borderRadius: "5px",
              border: "none",
              outline: "none",
              marginRight: "20px",
            }}
          />

          <Button
            variant="contained"
            sx={{
              width: "20%",
              boxShadow: "none",
              background: "#5669df",
              textTransform: "none",
            }}
            onClick={() => updateUser()}
          >
            Update
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default UpdateAvatarModal;
