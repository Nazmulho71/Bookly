import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "../assets/css/profile.css";

function profile() {
  return (
    <div className="profile">
      <h1>Edit your Profile</h1>
      <hr />

      <div className="profile__avatar">
        <div>
          <Avatar />
          <div>
            <h2>Samir Hossain</h2>
            <p>Update your photo and personal details.</p>
          </div>
        </div>

        <div>
          <Button variant="contained">Change Avatar</Button>
          <Button variant="contained">Remove Avatar</Button>
        </div>
      </div>

      <div className="profile__details">
        <div>
          <h3>Name:</h3>
          <input type="text" placeholder="Enter your name" />
        </div>

        <div>
          <h3>Email:</h3>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div>
          <h3>Password:</h3>
          <input type="password" placeholder="Enter your current password" />
          <div>
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm password" />
          </div>
        </div>
      </div>

      <div className="profile__buttons">
        <Button variant="contained">Save</Button>
        <Button variant="outlined">Cancel</Button>
      </div>
    </div>
  );
}

export default profile;
